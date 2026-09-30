import { and, eq, inArray, sql, sum } from "drizzle-orm";
import { defineAction, fail } from "@agent-native/core/action";
import { z } from "zod";

import { getDb, schema } from "../server/db.js";
import { mysqlNow } from "../server/mysql.js";
import {
  requirePublisherEmail,
  requirePublisherProfile,
} from "../server/lib/publisher-dashboard.js";

export default defineAction({
  description: "Reserve an available publisher balance in a withdrawal request.",
  schema: z.object({ amountIdr: z.number().int().min(1).max(2_147_483_647) }),
  run: async ({ amountIdr }, ctx) => {
    const publisherEmail = requirePublisherEmail(ctx?.userEmail);
    await requirePublisherProfile(publisherEmail);
    const db = await getDb();
    const now = mysqlNow();
    const withdrawal = {
      id: crypto.randomUUID(),
      publisherEmail,
      amountIdr,
      status: "Pending",
      transferReference: "",
      paidAt: null,
      reviewedBy: null,
      createdAt: now,
      updatedAt: now,
    };

    await db.transaction(async (tx) => {
      await tx.execute(
        sql`SELECT owner_email FROM publisher_profiles WHERE owner_email = ${publisherEmail} FOR UPDATE`,
      );
      const [profile] = await tx
        .select({ status: schema.publisherProfiles.status })
        .from(schema.publisherProfiles)
        .where(eq(schema.publisherProfiles.ownerEmail, publisherEmail))
        .limit(1);
      if (!profile || profile.status !== "Active") {
        fail("Akun Publisher tidak aktif.", {
          statusCode: 403,
          errorCode: "publisher_approval_required",
        });
      }
      const [earnings] = await tx
        .select({ amountIdr: sum(schema.publisherEarningEntries.amountIdr) })
        .from(schema.publisherEarningEntries)
        .where(eq(schema.publisherEarningEntries.publisherEmail, publisherEmail));
      const [withdrawals] = await tx
        .select({ amountIdr: sum(schema.publisherWithdrawals.amountIdr) })
        .from(schema.publisherWithdrawals)
        .where(
          and(
            eq(schema.publisherWithdrawals.publisherEmail, publisherEmail),
            inArray(schema.publisherWithdrawals.status, ["Pending", "Approved", "Paid"]),
          ),
        );
      const available = Number(earnings?.amountIdr ?? 0) - Number(withdrawals?.amountIdr ?? 0);
      if (amountIdr > available) {
        fail("Jumlah penarikan melebihi saldo tersedia.", {
          statusCode: 409,
          errorCode: "publisher_withdrawal_exceeds_balance",
        });
      }
      await tx.insert(schema.publisherWithdrawals).values(withdrawal);
    });

    return withdrawal;
  },
});

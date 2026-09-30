import { defineAction, fail } from "@agent-native/core/action";
import { z } from "zod";

import { getDb, schema } from "../server/db.js";
import { mysqlNow } from "../server/mysql.js";
import { requireUserEmail } from "../server/lib/advertiser-dashboard.js";

export default defineAction({
  description: "Save the signed-in user's Nevora profile and account role.",
  schema: z
    .object({
      fullName: z
        .string()
        .trim()
        .min(1)
        .max(120)
        .describe("Account holder's name"),
      businessName: z
        .string()
        .trim()
        .max(160)
        .optional()
        .describe("Advertiser business name; required for advertiser accounts"),
      phone: z.string().trim().min(7).max(24).describe("Contact phone number"),
      role: z
        .enum(["Konsumen", "Publisher", "Advertiser", "Partner"])
        .describe("Nevora account type"),
    })
    .superRefine(({ role, businessName }, context) => {
      if (role === "Advertiser" && !businessName) {
        context.addIssue({
          code: "custom",
          path: ["businessName"],
          message: "Business name is required for advertiser accounts.",
        });
      }
    }),
  run: async ({ fullName, businessName, phone, role }, ctx) => {
    const ownerEmail = requireUserEmail(ctx?.userEmail);
    const db = await getDb();
    const now = mysqlNow();
    await db.transaction(async (tx) => {
      await tx
        .insert(schema.users)
        .values({ email: ownerEmail, fullName, createdAt: now, updatedAt: now })
        .onDuplicateKeyUpdate({ set: { fullName, updatedAt: now } });
      await tx
        .insert(schema.accountRoles)
        .values({ userEmail: ownerEmail, role, createdAt: now })
        .onDuplicateKeyUpdate({ set: { createdAt: now } });

      if (role === "Advertiser") {
        await tx
          .insert(schema.advertiserProfiles)
          .values({
            ownerEmail,
            fullName,
            businessName: businessName ?? "",
            phone,
            role,
            createdAt: now,
            updatedAt: now,
          })
          .onDuplicateKeyUpdate({
            set: {
              fullName,
              businessName: businessName ?? "",
              phone,
              role,
              updatedAt: now,
            },
          });
      }
      if (role === "Publisher") {
        await tx
          .insert(schema.publisherProfiles)
          .values({
            ownerEmail,
            fullName,
            phone,
            createdAt: now,
            updatedAt: now,
          })
          .onDuplicateKeyUpdate({ set: { fullName, phone, updatedAt: now } });
      }
    });

    return { fullName, businessName: businessName ?? "", role };
  },
});

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../utility/db";
import { transporter } from "../utility/nodeMailer";


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    user: {
        additionalFields: {
            role: {
                type: 'string',
                defaultValue: "USER",
                required: false
            },
            phone: {
                type: 'string',
                required: false
            },
            status: {
                type: "string",
                defaultValue: "ACTIVE",
                required: false
            }
        }
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: true
    },

    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url, token }, req) => {
            try {
                transporter.sendMail({
                    from: `"My App" <${process.env.EMAIL_USER}>`,
                    to: user.email,
                    subject: "Hello from Bun 🚀",
                    text: "This email is sent using Bun + Nodemailer",
                    html: "<b>This email is sent using Bun + Nodemailer 🚀</b>",
                })
            } catch (error) {
                console.log(error)
                throw error
            }
        }
    }
});     
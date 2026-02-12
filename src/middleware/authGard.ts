import type { NextFunction, Request, Response } from "express"
import { auth } from "../lib/auth"
import { role } from "better-auth/plugins";
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                name: string;
                role: string;
                emailVerified: boolean;
            }
        }
    }
}
export enum UseRole {
    USER = "USER",
    ADMIN = "ADMIN"
}

export const authGard = (...role: UseRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const session = await auth.api.getSession({
                headers: req.headers
            })

            if (!session) {
                return res.status(401).json({
                    success: false,
                    message: "You are not authorize"
                })
            }
            if (!session.user.emailVerified) {
                return res.status(403).json({
                    success: false,
                    message: "You are not verified"
                })
            }
            req.user = {
                id: session.user.id,
                email: session.user.email,
                name: session.user.name,
                role: session.user.role as string,
                emailVerified: session.user.emailVerified
            }
            if (role.length && !role.includes(req.user.role as UseRole)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden: insufficient permissions"
                })
            }
            next()
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                success: false,
                message: "Authentication failed"
            })
        }
    }
}
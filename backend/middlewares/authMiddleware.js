import { clerkClient } from "@clerk/express";

// middleware {protect educator route}

export const protectEducatorRoute = async (req, res, next) => {
    try {

        if (!req.auth || !req.auth.userId) {
            return res.status(401).json({
                success: false,
                message: "Not authenticated"
            });
        }
        
        const userId = req.auth.userId
        const response = await clerkClient.users.getUser(userId)

        if (response.publicMetadata.role !== "educator") {
            return res.json({ success: false, messege: "Unathorized Access" });
        }

        next()
    } catch (error) {
        res.json({ success: false, messege: error.message })
    }
}
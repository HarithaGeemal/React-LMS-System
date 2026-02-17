import User from "../models/user.js"

export const getUserData = async (req, res) => {
    try {
        const userId = req.auth.userId
        const user = await User.findById(userId)

        if(!user){
            return res.json({ success: false, messege: "User not found" });
        }

        res.json({ success: true, messege: "User fetched successfully", user })

    } catch (error) {
        res.json({ success: false, messege: error.message })
    }
}
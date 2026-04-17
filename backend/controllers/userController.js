import User from "../models/User.js";
import Book from "../models/Book.js";

export const getWishlist = async (req, res) => {
    const user = await User.findById(req.user._id).populate("wishlist");
    res.json(user.wishlist);
};


export const addToWishlist = async (req, res) => {
    const user = await User.findById(req.user._id);

    const bookId = req.params.id;

    if (!user.wishlist.includes(bookId)) {
        user.wishlist.push(bookId);
        await user.save();
    }

    res.json({ message: "Added to wishlist" });
};


export const removeFromWishlist = async (req, res) => {
    const user = await User.findById(req.user._id);

    user.wishlist = user.wishlist.filter(
        (item) => item.toString() !== req.params.id
    );

    await user.save();

    res.json({ message: "Removed from wishlist" });
};
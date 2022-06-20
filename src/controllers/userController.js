import User from '../models/User';
import bcrypt from 'bcrypt';
import session from 'express-session';

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
    const { name, email, username, password, password2, location } = req.body;
    const pageTitle = "Join";
    if (password !== password2) {
        return res.render("join", { pageTitle, errorMessage: "Password confirmation does not match." });
    }
    const exists = await User.exists({ $or: [{ username }, { email }] });
    if (exists) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "This username/email is already taken."
        });
    }
    try {
        await User.create({
            name,
            email,
            username,
            password,
            location
        });
        res.redirect("/login");
    } catch (error) {
        return res.status(400).render("join", {
            pageTitle: "Join",
            errorMessage: error._message,
        })
    }
};
export const getLogin = (req, res) => {
    res.render("login", { pageTitle: "Login" });
};
export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const pageTitle = "Login";
    const user = await User.findOne({ username });
    if (!user) {
        res.status(400).render("login", { pageTitle, errorMessage: "This username does not exists" });
    };
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        res.status(400).render("login", { pageTitle, errorMessage: "Wrong password" });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
};
export const getEdit = (req, res) => {
    return res.render("edit-profile", { pageTitle: "Edit Profile" });
}
export const postEdit = async (req, res) => {
    const {
        session: { user: { _id }, },
        body: { name, email, username, location }
    } = req;
    const updatedUser = await User.findByIdAndUpdate(_id,
        { name, email, username, location },
        { new: true });
    req.session.user = updatedUser;
    return res.render("edit-profile");
}
export const getChangePassword = (req, res) => {
    return res.render("change-password", { pageTitle: "Change Password" });
}
export const postChangePassword = async (req, res) => {
    const {
        session: { user: { _id, password }, },
        body: { oldPassword, newPassword, newPasswordConfirmation }
    } = req;
    const ok = await bcrypt.compare(oldPassword, password);
    if (!ok) {
        return res.status(400).render("change-password", {
            pageTitle: "Change Password",
            errorMessage: "The password is incorrect",
        });
    }
    const user = await User.findById(_id);
    user.password = newPassword;
    await user.save();
    req.session.user.password = user.password;
    if (newPassword !== newPasswordConfirmation) {
        return res.status(400).render("change-password", {
            pageTitle: "Change Password",
            errorMessage: "The password does not match the confirmation",
        });
    }
    return res.redirect("logout");
}
export const see = (req, res) => res.send("See");
export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
}
import User from '../models/User';

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
    await User.create({
        name,
        email,
        username,
        password,
        location
    });
    res.redirect("/login");
};
export const login = (re, res) => res.render("login", { pageTitle: "Login" })
export const edit = (req, res) => res.send("Edit");
export const remove = (req, res) => res.send("Remove");
export const see = (req, res) => res.send("See");
export const logout = (req, res) => res.send("Logout");
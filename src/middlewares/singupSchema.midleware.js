import singupSchema from "../schemas/sing-upSchema";

export function singupValidation (req, res, next) {
    const {name, email, password, confirmedPass} = req.body;

    const singupData = {
        name,
        email,
        password,
        confirmedPass
    }

    const { error } = singupSchema.validate(singupData, { abortEarly: false});

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    req.singupData = singupData
}
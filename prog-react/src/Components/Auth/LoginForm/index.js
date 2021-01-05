import React from "react";
import { useForm } from 'react-hook-form';
import settings from "../../../settings";

const loginUser = function(credentials) {
    fetch(`${settings.apiUrl}/login`, {
        method: "POST",
        body: JSON.stringify(credentials)
    })
        .then(response => response.json())
        .then(userData => {
            console.log(userData);
            // TODO: Zapisanie danych autoryzacyjnych 
            // TODO: Przekierowanie na stronę z programem TV
        })
        .catch(error => {
            console.log(error);
            // TODO: Obsługa błędów logowania
        });
}


const LoginForm = function () {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => loginUser(data);

    return (
        <div className="d-flex justify-content-center">
            <form onSubmit={handleSubmit(onSubmit)} className="col-md-6 col-sm-12 mt-5">
                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input id="email" className="form-control" type="email" placeholder="E-mail" name="email" ref={register({required: true, pattern: /@{1}/i})} />
                    {errors.email ? (
                        <small className="text-danger">Podaj prawidłowy adres e-mail</small>
                    ) : ""}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Hasło</label>
                    <input id="password" className="form-control" type="password" placeholder="Hasło" name="password" ref={register({required: true, minLength: 6})} />
                    {errors.password ? (
                        <small className="text-danger">Podaj prawidłowe hasło (min. 6 znaków)</small>
                    ) : ""}
                </div>

                <input className="btn btn-outline-success" type="submit" />
            </form>
        </div>
    );
}

export default LoginForm;

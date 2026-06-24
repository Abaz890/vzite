 
import { FormEventHandler } from 'react';

export default function ResetPassword() {
    // const { data, setData, post, processing, errors, reset } = useForm({
    //     token: token,
    //     email: email,
    //     password: '',
    //     password_confirmation: '',
    // });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // post(route('password.store'), {
        //     onFinish: () => reset('password', 'password_confirmation'),
        // });
    };

    return ( 

            <form onSubmit={submit}>
 
            </form> 
    );
}

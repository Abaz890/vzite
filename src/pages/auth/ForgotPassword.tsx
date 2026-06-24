import GuestLayout from '@/layouts/GuestLayout'; 
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    // const { data, setData, post, processing, errors } = useForm({
    //     email: '',
    // });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // post(route('password.email'));
    };

    return (
        <GuestLayout> 

            <div className="mb-4 text-sm text-gray-600">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
 
            </form>
        </GuestLayout>
    );
}

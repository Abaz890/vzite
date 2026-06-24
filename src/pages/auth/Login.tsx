 import GuestLayout from '@/layouts/GuestLayout'; 
import { FormEventHandler } from 'react';

export default function Login({
    status, 
}: {
    status?: string; 
}) {
    // const { data, setData, post, processing, errors, reset } = useForm({
    //     email: '',
    //     password: '',
    //     remember: false,
    // });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // post(route('login'), {
        //     onFinish: () => reset('password'),
        // });
    };

    return (
        <GuestLayout> 
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

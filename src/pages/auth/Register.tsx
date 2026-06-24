 
import { Button } from '@/components/ui/button';
import GuestLayout from '@/layouts/GuestLayout';
import { FormEventHandler } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
    // const { data, setData, post, processing, errors, reset } = useForm({
    //     name: '',
    //     email: '',
    //     password: '',
    //     password_confirmation: '',
    // });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // post(route('register'), {
        //     onFinish: () => reset('password', 'password_confirmation'),
        // });
    };

    return (
        <GuestLayout> 

            <form onSubmit={submit}>
 

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        to={''}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <Button className="ms-4"  >
                        Register
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}

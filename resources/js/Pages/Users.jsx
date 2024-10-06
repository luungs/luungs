import Layout from '@/Layouts/Layout';
import { Link, Head } from '@inertiajs/react';

// Map the university names to their corresponding icon paths
const universityIcons = {
    'Семейский медицинский университет': '/university_icons/semey_medical_university.jpg',
    'Казахстанско-Российский медицинский университет': '/university_icons/kazakh_russian_medical_university.jpg',
    'Медицинский университет Астана': '/university_icons/astana_medical_university.png',
    'Академия медицинских наук им. С.Д. Асфендиярова': '/university_icons/sd_asfendiyarov_academy.png',
    'Западно-Казахстанский медицинский университет имени Марата Оспанова': '/university_icons/marat_ospanov_medical_university.jpg',
    'Международный казахско-турецкий университет имени Ходжи Ахмеда Ясави': '/university_icons/ahmet_yassawi_university.jpg',
    'Карагандинский медицинский университет': '/university_icons/krmu.jpg',
};

export default function Welcome({ auth, users }) {
    return (
        <>
            <Head title="Welcome" />
            <Layout>
                <div className='grid grid-cols-10 pt-5 gap-x-5'>
                    <div className='col-span-7'>
                        <input
                            type='text'
                            className='w-full block bg-white border border-gray-200 rounded-lg'
                            placeholder='Поиск...'
                        />
                        {users.length > 0 && users.map((user, index) => (
                            <Link href={`/user/${user.id}`} key={index} className='w-full block border border-gray-200 px-7 mt-2 py-5 rounded-lg bg-white'>
                                <div className='flex items-center'>
                                    <div className='text-xl font-semibold'>{user.name}</div>
                                    {universityIcons[user.university] && (
                                        <img
                                            src={universityIcons[user.university]}
                                            alt={`${user.university} icon`}
                                            className='ml-2 h-8 w-8'
                                        />
                                    )}
                                </div>
                                <div className='text-gray-500'>{user.university}</div>
                            </Link>
                        ))}
                    </div>
                    <div className='col-span-3'>
                        <div className='py-3 px-5 rounded-lg bg-white border border-gray-200'>
                            <div className='text-lg font-semibold'>Здесь нужно поставить новость</div>
                            <div className='text-blue-500 font-semibold text-xl'>luungs - bızden bızge</div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}


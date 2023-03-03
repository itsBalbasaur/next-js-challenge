import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Header from '@/components/Header';
import Card from '@/components/Card';
import { GetStaticProps } from 'next';
import { fetchDogBreeds, fetchDogBreedImage } from '@/lib/dogs.service';
import { useState } from 'react';

export default function Home({ breeds }: { breeds: string[] }) {
  const [searchInput, setSearchInput] = useState('');

  // Search Filter Function
  const searchFilter = (breeds: string[]) => {
    console.log(breeds);
    return Object.values(breeds).filter(breed =>
      breed.toString().toLowerCase().includes(searchInput)
    );
  };

  // Applying search filter function to breeds recieved from the API
  const filtered = searchFilter(breeds);

  // set the value of our useState searchInput anytime the user types on our input
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setSearchInput((e.target as HTMLInputElement).value);
  };

  return (
    <>
      <Head>
        <title>My Dog App</title>
        <meta
          name='description'
          content='my first dog app'
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>
      <main className={styles.main}>
        <Header>Dogs</Header>
        <input
          type='text'
          onChange={handleChange}
        />
        <div className={styles.grid}>
          {Object.values(filtered).map(breed => (
            <Card key={breed}>
              <h2>{breed}</h2>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async context => {
  const breeds = await fetchDogBreeds();

  return {
    props: { breeds },
  };
};

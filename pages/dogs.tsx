import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Header from '@/components/Header';
import Card from '@/components/Card';
import { GetServerSideProps } from 'next';
import { fetchDogBreeds, fetchDogBreedImage, DogBreeds } from '@/lib/dogs.service';

export default function Home({ breeds }: { breeds: DogBreeds }) {
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
        <div className={styles.grid}>
          {Object.entries(breeds).map(breed => (
            <Card key={breed}>
              <h2>{breed.slice(1)}</h2>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const breeds = await fetchDogBreeds();
  console.log(breeds);

  return {
    props: { breeds },
  };
};

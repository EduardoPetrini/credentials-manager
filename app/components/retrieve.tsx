import { useState, useEffect } from 'react';
import List from './list';
import { useSession } from 'next-auth/react';

declare type RegistryProps = {
  setLoad: (load: boolean) => void;
};

export default function Retrieve({ setLoad }: RegistryProps) {
  const [domain, setDomain] = useState('');
  const [empty, setEmpty] = useState(false);
  const [credentials, setCredentials] = useState<CredentialType[]>([]);
  const { data: session } = useSession();

  const handleRetrieve = async () => {
    if (!domain) {
      setEmpty(true);
      setTimeout(() => setEmpty(false), 2000);
      return;
    }
    
    setLoad(true);

    const response = await fetch('/api/retrieve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session, domain: domain.trim() }),
    });

    const json = await response.json();
    console.log(json);
    setCredentials(json);
    setLoad(false);
  };

  const handleDelete = async (credId: string) => {
    setLoad(true);
    const response = await fetch('/api/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session, credId }),
    });

    const json = await response.text();
    console.log(json);
    setLoad(false)

    if (!response.ok) {
      console.log('Error to delete', credId);
      console.log(json);
      return;
    }

    await handleRetrieve();
  };

  return (
    <div className="w-full md:p-24 p-10">
      <form className="lg:grid lg:grid-cols-4">
        <div className="mr-2 mb-2 lg:col-span-3">
          <label htmlFor="domain" className="text-sm font-medium text-gray-900 dark:text-white"></label>
          <input
            type="text"
            name="domain"
            placeholder="enter the name, domain or url to retrieve"
            onChange={e => setDomain(e.target.value)}
            value={domain}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          onClick={e => {
            e.preventDefault();
            handleRetrieve();
          }}
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Search
        </button>
        {empty ? <small className="mr-2 mb-2 p-2.5 text-red-700"> Enter a name, domain or url to retrieve</small> : null}
      </form>
      {credentials.length > 0 ? (
        <>
          <List credentials={credentials} handleDelete={handleDelete}/>
          <button
            onClick={e => {
              e.preventDefault();
              setCredentials([]);
              setDomain('');
            }}
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            New Search
          </button>
        </>
      ) : null}
    </div>
  );
}

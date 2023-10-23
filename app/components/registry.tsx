import { useState, useEffect } from 'react';
import { IconCopy } from './ui/icons';
export default function Registry() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [password, setPassword] = useState('');
  const [domain, setDomain] = useState('');
  const [login, setLogin] = useState('');
  const [disableSave, setDisableSave] = useState(true);

  useEffect(() => {
    if (password && domain) {
      setDisableSave(false);
    }
  }, [password, domain]);

  const handleSave = async () => {
    console.log('saving...', domain, login, password);

    if (!domain || !password) {
      setDisableSave(true);
      return;
    }

    const response = await fetch('/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ domain, password, login }),
    });

    await response.text();
    clear();
  };

  const clear = () => {
    setPassword('');
    setDomain('');
    setLogin('');
  };

  const cancel = () => {
    setOpen(false);
    clear();
  };

  const generatePassword = async () => {
    const response = await fetch('/api/generate', {
      method: 'POST',
    });
    const text = await response.text();
    console.log('password', text);
    setPassword(text);
  };
  return (
    <div className="w-full p-5 md:p-24">
      <button onClick={() => setOpen(true)} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
        Registry new Credential
      </button>

      {open ? (
        <div>
          <form>
            <div className="grid mb-6">
              <div>
                <label htmlFor="domain" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                <input
                  type="text"
                  name="domain"
                  placeholder="enter the name, domain or url"
                  onChange={e => setDomain(e.target.value)}
                  value={domain}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <br />
              <div>
                <label htmlFor="login" className="block text-sm font-medium text-gray-900 dark:text-white"></label>
                <input
                  type="text"
                  name="login"
                  placeholder="login details (optional)"
                  onChange={e => setLogin(e.target.value)}
                  value={login}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <br />
              <div className="lg:flex">
                <label htmlFor="domain" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                <button
                  onClick={e => {
                    e.preventDefault();
                    generatePassword();
                  }}
                  className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  Generate Password
                </button>
                {password ? <span className="border border-gray-300 text-gray-900 text-sm rounded-lg p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white  mr-2 mb-2">{password}</span> : null}
                {password ? (
                  <button
                    className="mr-2 mb-2"
                    onClick={e => {
                      e.preventDefault();
                      navigator.clipboard.writeText(password).then(() => {
                        console.log('password copied');
                      });
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                  >
                    <IconCopy />
                  </button>
                ) : null}
                {copied ? <small className="p-2 mr-2 mb-2 text-green-700">copied!</small> : null}
              </div>
            </div>
          </form>
          <div className="flex justify-between">
            <button
              onClick={handleSave}
              disabled={disableSave}
              className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
            >
              Save
            </button>
            <button onClick={cancel} className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
              Cancel
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

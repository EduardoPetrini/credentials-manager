import { IconEdit, IconEye, IconRemove } from './ui/icons';
declare type ListProps = {
  credentials: CredentialType[];
  handleDelete: (credId: string) => Promise<void>;
};
export default function List({ credentials, handleDelete }: ListProps) {
  const removeLine = (credId: string | undefined) => {
    if (!credId) {
      return;
    }

    console.log(credId);
    handleDelete(credId);
  };

  return (
    <div className="mb-2">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="rounded-tl-lg px-6 py-3">
              Actions
            </th>
            <th scope="col" className="px-6 py-3">
              Domain
            </th>
            <th scope="col" className="px-6 py-3">
              Login
            </th>
            <th scope="col" className="rounded-tr-lg px-6 py-3">
              Password
            </th>
          </tr>
        </thead>
        <tbody>
          {credentials.map((cred, index) => {
            const isLastItem = index === credentials.length - 1;
            return (
              <tr key={index} className={`bg-white dark:bg-gray-800 dark:border-gray-700 ${isLastItem ? '' : 'border-b'}`}>
                <td className={`flex gap-4 px-4 py-4 ${isLastItem ? 'rounded-bl-lg' : ''}`}>
                  {/* <button>
                    <IconEdit />
                  </button> */}
                  <button onClick={() => removeLine(cred._id)}>
                    <IconRemove />
                  </button>
                </td>
                <td className="px-6 py-4">{cred.domain}</td>
                <td className="px-6 py-4">{cred.login}</td>
                <td
                  className={`px-6 py-4 cursor-pointer ${isLastItem ? 'rounded-br-lg' : ''}`}
                  onClick={e => {
                    e.preventDefault();
                    const target = e.currentTarget;
                    target.innerHTML = `${cred.password} <small style="color: green;">copied!</small>`;
                    navigator.clipboard.writeText(cred.password);

                    setTimeout(() => (target.innerText = '***'), 2000);
                  }}
                >
                  ***
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

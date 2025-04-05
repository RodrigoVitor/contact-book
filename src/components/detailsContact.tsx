import axios from "axios";
import { Link } from "react-router-dom";

type detailsContactType = {
  contacts: [
    {
      id: number;
      name: string;
    }
  ];
  isDeletedContact: () => void;
};

export default function DetailsContact({
  contacts,
  isDeletedContact,
}: detailsContactType) {
  async function deleteContact(id: number) {
    try {
      await axios.post("http://localhost:3000/contact/" + id);
      isDeletedContact();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      {contacts.map((contact, index) => (
        <div
          key={index}
          className="bg-white w-[700px] p-4 mt-4 flex justify-between"
        >
          <p>{contact.name}</p>
          <div className="flex gap-4 items-center">
            <Link to={"/detalhes/" + contact.id}>Ver detalhes</Link>
            <small
              onClick={() => deleteContact(contact.id)}
              className="text-red-600 cursor-pointer hover:text-red-500"
            >
              Deletar
            </small>
          </div>
        </div>
      ))}
    </div>
  );
}

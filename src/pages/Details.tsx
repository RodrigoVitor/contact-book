import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type ContactType = {
  name: string;
  email: string;
  whatsapp: string;
};

export default function Details() {
  const { id } = useParams();
  const [contact, setContact] = useState<ContactType>();

  useEffect(() => {
    getContact();
  }, []);

  async function getContact() {
    const res = await axios.get(`http://localhost:3000/contact/${id}`);
    setContact(res.data[0]);
  }

  return (
    <div className="flex flex-col items-center">
      <Link to="/">Voltar</Link>
      <div className="bg-white w-[700px] p-4">
        {contact && (
          <>
            <p>
              <strong>Nome: </strong> {contact.name}
            </p>
            <p>
              <strong>Email: </strong> {contact.email}
            </p>
            <p>
              <strong>Whatsapp: </strong> {contact.whatsapp}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

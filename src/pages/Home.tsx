import { ChangeEvent, useEffect, useState } from "react";
import Input from "../components/input";
import DetailsContact from "../components/detailsContact";
import axios from "axios";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [zap, setZap] = useState("");
  const [contacts, setContacts] = useState<{ id: number; name: string }[]>([]);
  const [isNewContact, setIsNewContact] = useState(false);

  useEffect(() => {
    searchData();
  }, [isNewContact]);

  async function searchData() {
    try {
      const res = await axios.get("http://localhost:3000/");
      setContacts(res.data);
    } catch (error) {
      return error;
    }
  }

  async function storeContact(name: string, email: string, whatsapp: string) {
    try {
      if (name && whatsapp) {
        setIsNewContact(true);
        const data = {
          name,
          email,
          whatsapp,
        };
        await axios.post("http://localhost:3000/contact", data);
        setName("");
        setEmail("");
        setZap("");
        setIsNewContact(false);
      } else {
        alert("Os dados nome ou whatsapp não podem ser vazios");
      }
    } catch (error) {
      return error;
    }
  }

  // validate telephone
  const maskTelephone = (valor: string) => {
    if (valor.length > 15) {
      return;
    }
    let numero = valor.replace(/\D/g, ""); // Remove caracteres não numéricos
    numero = numero.replace(/^(\d{2})(\d)/g, "($1) $2"); // Adiciona o DDD
    numero = numero.replace(/(\d{4})(\d{1,4})$/, "$1-$2"); // Adiciona o hífen
    setZap(numero);
  };

  function handleChangeZap(e: ChangeEvent<HTMLInputElement>) {
    maskTelephone(e.target.value);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white w-[700px] p-4 flex flex-col items-center gap-4 mt-8">
        <h1 className="text-3xl font-bold text-slate-600">
          Cadastre seu contato no ContactBook
        </h1>
        <Input
          type="text"
          placeholder="Digite o nome do contato. Ex Lucas José"
          value={name}
          onChangeInput={(e: ChangeEvent<HTMLInputElement>) => {
            void setName(e.target.value); // Ignora o valor de retorno
          }}
        />

        <Input
          type="email"
          placeholder="Digite o email do contato"
          value={email}
          onChangeInput={(e: ChangeEvent<HTMLInputElement>) => {
            void setEmail(e.target.value); // Ignora o valor de retorno
          }}
        />

        <Input
          type="text"
          placeholder="Digite o whatsapp. (XX) XXXX-XXXX"
          value={zap}
          onChangeInput={handleChangeZap}
        />

        <button
          onClick={() => storeContact(name, email, zap)}
          type="submit"
          className="w-[150px] p-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Salvar
        </button>
      </div>
      <DetailsContact
        isDeletedContact={() => setIsNewContact(true)}
        contacts={contacts}
      />
    </div>
  );
}

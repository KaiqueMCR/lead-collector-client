import axios from 'axios'
import { CircleNotch } from 'phosphor-react'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

export function Register() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [tel, setTel] = useState('')
  const [pro, setPro] = useState('')
  const [loading, setLoading] = useState(false)

  const data = {
    name,
    email,
    tel,
    pro
  }
  
  function maskPhone(value: string) {
    return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
    .replace(/(-\d{4})\d+?$/, '$1');
  }
  
  async function handleSubmit(e: React.MouseEvent) {
    if (name != '' && email != '' && tel != '' && pro != '' && tel.length == 15) {
      e.preventDefault()
      setLoading(true)

        try {
          await axios.post(import.meta.env.VITE_SERVER_URL, data)
          toast.success('Enviado com sucesso!')
          setTimeout(() => {
            window.location.replace(import.meta.env.VITE_REDIRECT_TO)
          }, 3000)
          setLoading(false)
        } catch (error) {
          setLoading(false)
          toast.error('Ago deu errado. Tente Novamente!')
        }   
      }
    }

    return (
      <div className="flex flex-col justify-center items-center gap-8">
            <img src="./logoPJ.jpg" alt="logo payjob" className="w-64" />
            <h1 className="text-xl font-bold max-w-sm text-center text-white">Preencha o cadastro e obtenha acesso exclusivo ao nosso grupo no WhatApp!</h1>
            <form className="shadow-lg w-full p-4 max-w-sm flex flex-col gap-4 bg-white rounded-lg items-center text-lg">
                <input required onChange={(e)=> setName(e.currentTarget.value)} type="text" placeholder="Nome completo*" className="w-full p-2 rounded outline-[#1c60ad] bg-zinc-200 py-4 placeholder-zinc-500" />
                <input required onChange={(e)=> setEmail(e.currentTarget.value)} type="email" placeholder="Email*" className="w-full p-2 rounded outline-[#1c60ad] bg-zinc-200 py-4 placeholder-zinc-500" />
                <input required onChange={(e)=> setPro(e.currentTarget.value)} type="text" placeholder="Profissão*" className="w-full p-2 rounded outline-[#1c60ad] bg-zinc-200 py-4 placeholder-zinc-500" />
                <input minLength={16} maxLength={16} placeholder="Celular* (99) 99999-9999" value={tel} onChange={(e) => setTel(maskPhone(e.currentTarget.value))} type="tel" className="w-full p-2 rounded outline-[#1c60ad] bg-zinc-200 py-4 placeholder-zinc-500" />
                <button disabled={loading} onClick={handleSubmit} className="w-full flex justify-center items-center text-center bg-[#005BA6] px-8 py-4 text-white rounded hover:bg-[#005BA6] transition-colors">{loading ? <CircleNotch size={24} className="text-white animate-spin" />: "Enviar" }</button>
            </form>
            <p className="text-white">powered by <a className="hover:underline" href="https://payjob.com.br">www.payjob.com.br</a></p>
        </div>
    )
}

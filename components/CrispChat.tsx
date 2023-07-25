'use client'

import { useEffect } from "react"
import { Crisp } from "crisp-sdk-web"

const CrispChat = () => {

  useEffect(() => {
    Crisp.configure("65d51f5e-6ca3-471c-8f0f-52ac06cfdcf6");
  }, [])

  return null;
}

export default CrispChat
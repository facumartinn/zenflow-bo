/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'

import { Header } from '@/src/components/Header'
import { PreferenceSettings } from '@/src/components/Settings/Preferences'
import { warehouseConfigAtom } from '@/src/store/configAtom'
import { Box } from '@chakra-ui/react'
import { useAtom } from 'jotai'

export default function ConfigurationPage () {
  const [warehouseConfig] = useAtom(warehouseConfigAtom)
  return (
    <>
      <Header
        title="Configuración"
        showButton={false}
        buttonLabel='CARGAR PEDIDO'
        onClick={() => { console.log('Aca tiene que ir una funcion') }} />
        <Box w='50%' p={4}>
          <PreferenceSettings warehouseSettings={warehouseConfig} />
        </Box>
    </>
  )
}

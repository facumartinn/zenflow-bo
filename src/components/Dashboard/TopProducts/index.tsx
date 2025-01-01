/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, Tabs, TabList, TabPanels, TabPanel, Tab } from '@chakra-ui/react'

interface Product {
  position: number
  name: string
  quantity: number
  price: number
}

interface TopProductsProps {
  products: Product[]
}

export const TopProducts = ({ products }: TopProductsProps) => {
  return (
    <Box bg="white" p={6} borderRadius="lg" shadow="sm" h="100%" overflow="auto">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Productos más vendidos
      </Text>

      <Tabs h="calc(100% - 50px)">
        <TabList>
          <Tab>Por cantidad</Tab>
          <Tab>Por precio</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Puesto</Th>
                  <Th>Producto</Th>
                  <Th isNumeric>Cantidad</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.map((product) => (
                  <Tr key={product.position}>
                    <Td>{product.position}</Td>
                    <Td>{product.name}</Td>
                    <Td isNumeric>{product.quantity}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Puesto</Th>
                  <Th>Producto</Th>
                  <Th isNumeric>Precio</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.map((product) => (
                  <Tr key={product.position}>
                    <Td>{product.position}</Td>
                    <Td>{product.name}</Td>
                    <Td isNumeric>${product.price}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

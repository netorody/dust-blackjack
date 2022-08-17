import { Flex, Text, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useState, createContext, useContext } from 'react';

type IAccordion = string | number;

const AccordionContext = createContext<{
  expanded: IAccordion;
  setExpanded: React.Dispatch<React.SetStateAction<IAccordion>>;
}>({ expanded: 'pre-launch', setExpanded: () => null });

interface ItemProps {
  id: IAccordion;
  title?: React.ReactNode | string;
  description?: React.ReactNode | string;
}

const Item: React.FC<ItemProps> = ({ id, title, description }) => {
  const { expanded, setExpanded } = useContext(AccordionContext);
  const isOpen = id === expanded;

  const handleOpening = () => (!isOpen ? setExpanded(id) : setExpanded(''));

  const color = isOpen ? '#ABFC4F' : 'white';

  return (
    <motion.div
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      transition={{ duration: 2, type: 'spring' }}
      variants={{
        open: {
          height: 300,
          background: isOpen ? '#191A17' : 'black',
          transition: { delay: 0.3 },
        },
        closed: {
          height: '165px',
          background: 'transparent',
          borderTop: '0.5px solid rgba(255,255,255,0.1)',
          borderBottom: '0.5px solid rgba(255,255,255,0.1)',
        },
      }}
    >
      <Flex
        height="100%"
        
        justifyContent="center"
        alignItems="center"
      >
        <Flex
          direction="row"
          maxW="1067px"
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          onClick={handleOpening}
          cursor="pointer"
          p="0px 30px"
        >
          <Flex width="100%" direction="row" justifyContent="space-between">
            <Stack>
              <Text fontSize="20px" fontWeight="bold" color="green">
                {title}
              </Text>
              <motion.div
                initial={false}
                animate={isOpen ? 'open' : 'closed'}
                variants={{
                  closed: { height: 0, opacity: 0 },
                  open: {
                    height: 'auto',
                    opacity: 1,
                    transition: { delay: 0.5 },
                  },
                }}
              >
                <Flex p="10px 5px">{description}</Flex>
              </motion.div>
            </Stack>
          </Flex>
          <Flex position="static" top="40px">
            <svg
              width="30"
              height="30"
              viewBox="0 0 53 53"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11 24H41.9167V28.4167H11V24Z" fill={color} />
              <motion.path
                animate={!isOpen ? 'closed' : 'open'}
                variants={{
                  open: { opacity: 0 },
                  closed: { opacity: 1 },
                }}
                d="M24.25 41.6667L24.25 10.75H28.6667V41.6667H24.25Z"
                fill={color}
              />
            </svg>
          </Flex>
        </Flex>
      </Flex>
    </motion.div>
  );
};

interface WrapperProps {
  initialExpand?: IAccordion;
}

const Wrapper: React.FC<WrapperProps> = ({ children, initialExpand = '' }) => {
  const [expanded, setExpanded] = useState<IAccordion>(initialExpand);

  return (
    <AccordionContext.Provider value={{ expanded, setExpanded }}>
      <Flex direction="column" mt="50px">
        {children}
      </Flex>
    </AccordionContext.Provider>
  );
};

export const Accordion = {
  Wrapper,
  Item,
};

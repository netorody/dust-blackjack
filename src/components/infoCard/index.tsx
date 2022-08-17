import { Box, Text, BoxProps } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';

export const InfoCard: React.FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <AnimatePresence presenceAffectsLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Box
          bg="linear-gradient(108.24deg, #ABFC4F 0%, rgba(255, 255, 255, 0) 100%)"
          p="2px"
        >
          <Box bg="#20201E" p="30px" {...rest}>
            <Text opacity="0.7" textAlign="justify" fontStyle="italic">
              {children}
            </Text>
          </Box>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

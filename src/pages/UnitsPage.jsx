import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Container from '../components/common/Container';
import PageHeader from '../components/common/PageHeader';
import UnitCard from '../components/units/UnitCard';
import { getUnits } from '../utils/dataHelper';
import { useTracking } from '../hooks/useTracking';

export default function UnitsPage() {
  const units = useMemo(() => getUnits(), []);
  const { getUnitProgress } = useTracking();

  return (
    <div className="pt-20 pb-16 min-h-screen">
      <Container className="py-8">
        <PageHeader
          title="All Units"
          badge="Java OOP"
          description={`${units.length} units covering the complete BCA 2nd semester Java OOP syllabus.`}
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } }
          }}
        >
          {units.map(unit => (
            <motion.div
              key={unit.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.35 } }
              }}
            >
              <UnitCard unit={unit} progress={getUnitProgress(unit.id)} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </div>
  );
}

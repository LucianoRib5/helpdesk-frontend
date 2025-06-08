import { useRef } from 'react';
import { CustomBox, ReportCharts, ReportFilter } from '../../components';
import { useAppSelector } from '../../hooks/useAppSelector';

const Reports = () => {
  const { reportData } = useAppSelector((state) => state.ticket);
  const reportRef = useRef<HTMLDivElement>(null);
    
  return (
    <CustomBox>
      <ReportFilter reportRef={reportRef}/>
      {reportData && (
        <CustomBox sx={{ mt: 2 }}>
          <ReportCharts data={reportData} ref={reportRef}/>
        </CustomBox>
      )}
    </CustomBox>
  );
}

export default Reports;
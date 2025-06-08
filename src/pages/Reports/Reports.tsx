import { CustomBox, ReportCharts, ReportFilter } from '../../components';
import { useAppSelector } from '../../hooks/useAppSelector';

const Reports = () => {
  const { reportData } = useAppSelector((state) => state.ticket);
    
  return (
    <CustomBox>
      <ReportFilter />
      {reportData && (
        <CustomBox sx={{ mt: 2 }}>
          <ReportCharts data={reportData} />
        </CustomBox>
      )}
    </CustomBox>
  );
}

export default Reports;
import { forwardRef } from 'react';
import {
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  LineChart, 
  Line, 
  CartesianGrid,
  PieChart, 
  Pie, 
  Cell, 
  Legend
} from 'recharts';
import type { TicketReportData } from '../features/ticket/ticketTypes';
import CustomBox from './CustomBox';
import CustomText from './CustomText';
import { formatDateToPtBR } from '../utils/formatDate';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';

interface ReportChartsProps {
  data: TicketReportData;
};

const COLORS = [
  '#00B8AA',
  '#FD625E', 
  '#F2C80E', 
  '#ff6361', 
  '#ffa600',
  '#ccc',
];

const ReportCharts = forwardRef<HTMLDivElement, ReportChartsProps>(({ data }, ref) => {
  return (
    <CustomBox sx={{ display: 'flex', flexDirection: 'column', gap: 3 }} ref={ref}>
      <CustomBox sx={{ borderRadius: 2, boxShadow: 1, p: 3 }}>
        <CustomText variant='h6' fontWeight='bold'>Tickets por status</CustomText>
        <ResponsiveContainer width='80%' height={350}>
          <BarChart
            layout='vertical'
            data={data.ticketsByStatus}
            margin={{ top: 10, right: 10, left: 40, bottom: 10 }}
          >
            <XAxis type='number' />
            <YAxis dataKey='label' type='category' tickFormatter={capitalizeFirstLetter}/>
            <Tooltip 
              content={({ active, payload, label  }) => {
                if (active && payload && payload.length) {
                  return (
                    <div style={{ backgroundColor: '#fff', padding: '5px', borderRadius: '5px' }}>
                      <CustomText>{`Status: ${capitalizeFirstLetter(label)}`}</CustomText>
                      <CustomText>{`Total: ${payload[0].value}`}</CustomText>
                    </div>
                  );
                }
                return null;
              }
            }
            />
            <Bar dataKey='count' fill={COLORS[0]} />
          </BarChart>
        </ResponsiveContainer>
      </CustomBox>

      <CustomBox sx={{ borderRadius: 2, boxShadow: 1, p: 3 }}>
        <CustomText variant='h6' fontWeight='bold'>Tickets ao longo do tempo</CustomText>
        <ResponsiveContainer width='80%' height={350}>
          <LineChart data={data.ticketsOverTime}>
            <CartesianGrid stroke={COLORS[5]} />
            <XAxis dataKey='date' tickFormatter={formatDateToPtBR} />
            <YAxis />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div style={{ backgroundColor: '#fff', padding: '5px', borderRadius: '5px' }}>
                      <CustomText>{`Data: ${formatDateToPtBR(payload[0].payload.date)}`}</CustomText>
                      <CustomText>{`Total de Tickets: ${payload[0].value}`}</CustomText>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line type='monotone' dataKey='count' />
          </LineChart>
        </ResponsiveContainer>
      </CustomBox>

      <CustomBox sx={{ borderRadius: 2, boxShadow: 1, p: 3 }}>
        <CustomText variant='h6' fontWeight='bold'>Tickets por prioridade</CustomText>
        <ResponsiveContainer width='80%' height={380}>
          <PieChart>
            <Pie
              data={data.ticketsByPriority}
              dataKey='count'
              nameKey='label'
              cx='50%'
              cy='50%'
              outerRadius={140}
              label={({ name, percent }) => `${capitalizeFirstLetter(name)} (${(percent * 100).toFixed(0)}%)`}
            >
              {data.ticketsByPriority.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              content={({payload }) => {
                if (payload && payload.length) {
                  return (
                    <div style={{ backgroundColor: '#fff', padding: '5px', borderRadius: '5px' }}>
                      <CustomText>{`Total: ${payload[0].value}`}</CustomText>
                    </div>
                  );
                }
                return null;
              }
            }
            />
            <Legend 
              formatter={(value) => capitalizeFirstLetter(value as string)}
              layout='vertical'
              align='right'
              verticalAlign='top'
            />
          </PieChart>
        </ResponsiveContainer>
      </CustomBox>
    </CustomBox>
  );
});

export default ReportCharts;

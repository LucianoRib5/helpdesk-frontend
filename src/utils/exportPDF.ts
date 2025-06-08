import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function exportReportPDF(element: HTMLElement, filename = 'relatorio-graficos.pdf') {
  element.classList.add('exporting');

  const canvas = await html2canvas(element, {
    backgroundColor: '#ffffff',
    useCORS: true,
    scale: 2,
    scrollY: 0,
    scrollX: 0,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
  });

  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [canvas.width, canvas.height],
  });

  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
  pdf.save(filename);

  element.classList.remove('exporting');
}

export function formatNumber(num: number): string {
    if (num < 1000 && num >= 0) {
      return num.toFixed(2); // Less than a thousand, just return the number
    }

    if (num > 0) {
      let numx = num;
      const units = ['K', 'M', 'B', 'T'];
      let unitIndex = -1;
      
      while (numx >= 1000 && unitIndex < units.length - 1) {
        numx /= 1000;
        unitIndex++;
      }
    
      return `${numx.toFixed(2)}${units[unitIndex]}`;
    } else {
      let numx = num - num - num;
      const units = ['K', 'M', 'B', 'T'];
      let unitIndex = -1;
      
      while (numx >= 1000 && unitIndex < units.length - 1) {
        numx /= 1000;
        unitIndex++;
      }
    
      return `-${numx.toFixed(2)}${units[unitIndex]}`;
    }
  }
  
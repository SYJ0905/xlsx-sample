<template>
  <div class="home">
    <a href="#" @click.prevent="download">下載</a>
  </div>
</template>

<script>
// @ is an alias to /src

import XLSX from 'xlsx';
import XLSXStyle from 'xlsx-style';
import { saveAs } from 'file-saver';

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      tempData: [
        [null, 'A', 'B', 'C', 'D'],
        ['1', '姓名', '性別˙', '年齡', '居住地'],
        ['2', 'Cloud', '男', '27', '新北市'],
        ['3', 'XXX', '男˙', '20', '台中市'],
        ['4', 'YYY', '女', '25', '高雄市'],
      ],
    };
  },
  methods: {
    async download() {
      const workSheet = XLSX.utils.aoa_to_sheet(this.tempData);
      workSheet['!cols'] = [
        { wpx: 120 },
        { wpx: 120 },
        { wpx: 120 },
        { wpx: 120 },
        { wpx: 120 },
      ];
      // workSheet['!merges'] = [
      //   { s: { r: 0, c: 1 }, e: { r: 0, c: 6 } },
      //   { s: { r: 1, c: 1 }, e: { r: 1, c: 6 } },
      //   { s: { r: 2, c: 1 }, e: { r: 2, c: 6 } },
      // ];

      const exclude = ['!cols', '!merges', '!ref'];
      Object.keys(workSheet).forEach((item) => {
        if (exclude.indexOf(item) === -1) {
          workSheet[item].s = {
            font: {
              color: { rgb: 'FF0187FA' },
              bold: true,
            },
            alignment: {
              vertical: 'center',
              horizontal: 'left',
              wrapText: 1,
            },
          };
        }
      });

      console.log('workSheet =>', workSheet);

      const workbook = {
        SheetNames: [
          'Test',
        ],
        Sheets: {
          Test: workSheet,
        },
      };
      console.log(workbook);

      // 設定檔案形式
      const workbookout = XLSXStyle.write(workbook, {
        bookType: 'xlsx',
        type: 'binary',
      });
      console.log('workbookout =>', workbookout);

      const s2ab = (s) => {
        const buf = new ArrayBuffer(s.length);
        console.log('buf =>', buf);
        const view = new Uint8Array(buf);
        console.log('view =>', view);
        // eslint-disable-next-line no-bitwise
        for (let i = 0; i !== s.length; i += 1) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
      };

      const blob = new Blob([s2ab(workbookout)], {
        type: 'application/octet-stream',
      });
      console.log('blob =>', blob);

      saveAs(blob, '測試表格.xlsx');
    },
  },
};
</script>

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('treatment_table')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('treatment_table').insert([
        // mt
        {
          treatment_id: 1,
          treatment_name: 'EKG',
          detail: 'การตรวจคลื่นไฟฟ้าหัวใจ',
          cgd_code: '51410',
          type: 'mt',
          disburseable: 200,
          cost: 200
        },
        {
          treatment_id: 2,
          treatment_name: 'X-Ray',
          detail: 'เอกเรย์ทรวงอก',
          cgd_code: '41001',
          type: 'mt',
          disburseable: 170,
          cost: 400
        },
        {
          treatment_id: 3,
          treatment_name: 'Chromosome study/ Cytogenetic',
          detail: 'ตรวจวิเคราะห์โครโมโซม (น้ำคร่ำ)',
          cgd_code: '30402',
          type: 'mt',
          disburseable: 0,
          cost: 2500
        },
        {
          treatment_id: 4,
          treatment_name: 'Chromosome study (peripheral blood)',
          detail: 'ตรวจวิเคราะห์โครโมโซม (เลือด)',
          cgd_code: '30401',
          type: 'mt',
          disburseable: 0,
          cost: 1500
        },
        {
          treatment_id: 5,
          treatment_name: 'CBC',
          detail: 'ความสมบูรณ์ของเม็ดเลือด',
          cgd_code: '30101',
          type: 'mt',
          disburseable: 90,
          cost: 90
        },
        {
          treatment_id: 6,
          treatment_name: 'Blood Group',
          detail: 'ตรวจหมู่เลือด',
          cgd_code: '30119',
          type: 'mt',
          disburseable: 50,
          cost: 50
        },
        {
          treatment_id: 7,
          treatment_name: 'Hb typing',
          detail: 'ตรวจวิเคราะห์ชนิดและปริมาณฮีโมโกลบิน',
          cgd_code: '30313',
          type: 'mt',
          disburseable: 270,
          cost: 270
        },
        {
          treatment_id: 8,
          treatment_name: 'Urine analysis',
          detail: 'ตรวจวิเคราะห์ปัสสาวะ',
          cgd_code: '31001',
          type: 'mt',
          disburseable: 50,
          cost: 50
        },
        {
          treatment_id: 9,
          treatment_name: 'Methamphetamine',
          detail: 'ตรวจสารเสพติดในปัสสาวะ',
          cgd_code: '33617',
          type: 'mt',
          disburseable: 0,
          cost: 210
        },
        {
          treatment_id: 10,
          treatment_name: 'Urine Pregnancy test',
          detail: 'ตรวจการตั้งครรภ์',
          cgd_code: '31101',
          type: 'mt',
          disburseable: 0,
          cost: 140
        },
        {
          treatment_id: 11,
          treatment_name: 'Stool examination',
          detail: 'ตรวจหาพยาธิในอุจจาระ',
          cgd_code: '31201,31203',
          type: 'mt',
          disburseable: 70,
          cost: 70
        },
        {
          treatment_id: 12,
          treatment_name: 'Glucose',
          detail: 'ระดับน้ำตาลในเลือด',
          cgd_code: '32203',
          type: 'mt',
          disburseable: 40,
          cost: 40
        },
        {
          treatment_id: 13,
          treatment_name: 'BUN',
          detail: 'ประเมินการทำงานของไต',
          cgd_code: '32201',
          type: 'mt',
          disburseable: 50,
          cost: 50
        },
        {
          treatment_id: 14,
          treatment_name: 'Creatinine',
          detail: 'ประเมินการทำงานของไต',
          cgd_code: '32202',
          type: 'mt',
          disburseable: 50,
          cost: 50
        },
        {
          treatment_id: 15,
          treatment_name: 'Uric Acid',
          detail: 'กรดยูริคในเลือด',
          cgd_code: '32205',
          type: 'mt',
          disburseable: 60,
          cost: 60
        },
        {
          treatment_id: 16,
          treatment_name: 'Cholesterol',
          detail: 'ระดับไขมันคอเลสเตอรอล',
          cgd_code: '32501',
          type: 'mt',
          disburseable: 60,
          cost: 60
        },
        {
          treatment_id: 17,
          treatment_name: 'Triglyceride',
          detail: 'ระดับไขมันไตรกลีเซอไรด์',
          cgd_code: '32502',
          type: 'mt',
          disburseable: 60,
          cost: 60
        },
        {
          treatment_id: 18,
          treatment_name: 'HDL-C',
          detail: 'ระดับไขมัน HDL',
          cgd_code: '32503',
          type: 'mt',
          disburseable: 100,
          cost: 100
        },
        {
          treatment_id: 19,
          treatment_name: 'LDL',
          detail: 'ระดับไขมัน LDL (คำนวณค่า)',
          cgd_code: null,
          type: 'mt',
          disburseable: 0,
          cost: 0
        },
        {
          treatment_id: 20,
          treatment_name: 'AST',
          detail: 'ประเมินการทำงานของตับ',
          cgd_code: '32310',
          type: 'mt',
          disburseable: 50,
          cost: 50
        },
        {
          treatment_id: 21,
          treatment_name: 'ALT',
          detail: 'ประเมินการทำงานของตับ',
          cgd_code: '32311',
          type: 'mt',
          disburseable: 50,
          cost: 50
        },
        {
          treatment_id: 22,
          treatment_name: 'ALP',
          detail: 'ประเมินการทำงานของตับ',
          cgd_code: '32309',
          type: 'mt',
          disburseable: 50,
          cost: 50
        },
        {
          treatment_id: 23,
          treatment_name: 'Electrolyte(Na,K,Cl,CO2)',
          detail: 'การตรวจแร่ธาตุและสารละลายในเลือด',
          cgd_code: '32102,32103,32104,32105',
          type: 'mt',
          disburseable: 160,
          cost: 160
        },
        {
          treatment_id: 24,
          treatment_name: 'Hb A1c',
          detail: 'ตรวจระดับน้ำตาลสะสมในเลือด',
          cgd_code: '32401',
          type: 'mt',
          disburseable: 150,
          cost: 150
        },
        {
          treatment_id: 25,
          treatment_name: 'LDL -drect',
          detail: 'ระดับไขมัน LDL (ตรวจวัดโดยตรง)',
          cgd_code: '32504',
          type: 'mt',
          disburseable: 150,
          cost: 150
        },
        {
          treatment_id: 26,
          treatment_name: 'Total Bilirubin',
          detail: 'ระดับบิลลิรูบินในเลือด',
          cgd_code: '32208',
          type: 'mt',
          disburseable: 50,
          cost: 70
        },
        {
          treatment_id: 27,
          treatment_name: 'Direct Bilirubin',
          detail: 'ระดับบิลลิรูบินในเลือด',
          cgd_code: '32207',
          type: 'mt',
          disburseable: 50,
          cost: 70
        },
        {
          treatment_id: 28,
          treatment_name: 'Total Protein',
          detail: 'ตรวจปริมาณโปรตีนในเลือด',
          cgd_code: '32402',
          type: 'mt',
          disburseable: 50,
          cost: 70
        },
        {
          treatment_id: 29,
          treatment_name: 'Albumin',
          detail: 'ตรวจปริมาณโปรตีนในเลือด',
          cgd_code: '32403',
          type: 'mt',
          disburseable: 50,
          cost: 70
        },
        {
          treatment_id: 30,
          treatment_name: 'Globulin',
          detail: 'ตรวจปริมาณโปรตีนในเลือด',
          cgd_code: null,
          type: 'mt',
          disburseable: 100,
          cost: 140
        },
        {
          treatment_id: 31,
          treatment_name: 'GGT',
          detail: 'ระดับเอนไซม์ Gamma GT',
          cgd_code: '32312',
          type: 'mt',
          disburseable: 130,
          cost: 180
        },
        {
          treatment_id: 32,
          treatment_name: 'Calcium',
          detail: 'ระดับแคลเซียมในเลือด',
          cgd_code: '32106',
          type: 'mt',
          disburseable: 50,
          cost: 140
        },
        {
          treatment_id: 33,
          treatment_name: 'Phosphorus',
          detail: 'ระดับฟอสฟอรัสในเลือด',
          cgd_code: '32109',
          type: 'mt',
          disburseable: 55,
          cost: 140
        },
        {
          treatment_id: 34,
          treatment_name: 'Magnesium',
          detail: 'ระดับแมกนีเซียมในเลือด',
          cgd_code: '32107',
          type: 'mt',
          disburseable: 70,
          cost: 250
        },
        {
          treatment_id: 35,
          treatment_name: 'Urine microalbumin',
          detail: 'ระดับอัลบูมินในปัสสาวะ',
          cgd_code: '34116',
          type: 'mt',
          disburseable: 270,
          cost: 270
        },
        {
          treatment_id: 36,
          treatment_name: 'HBsAg',
          detail: 'ตรวจการติดเชื้อไวรัสตับอักเสบบี',
          cgd_code: '36318',
          type: 'mt',
          disburseable: 80,
          cost: 80
        },
        {
          treatment_id: 37,
          treatment_name: 'HBsAb',
          detail: 'ตรวจการติดเชื้อไวรัสตับอักเสบบี (ภูมิคุ้มกัน)',
          cgd_code: '36317',
          type: 'mt',
          disburseable: 100,
          cost: 100
        },
        {
          treatment_id: 38,
          treatment_name: 'HBcAb',
          detail: 'ตรวจการติดเชื้อไวรัสตับอักเสบบี',
          cgd_code: '36310',
          type: 'mt',
          disburseable: 140,
          cost: 140
        },
        {
          treatment_id: 39,
          treatment_name: 'Anti-HCV',
          detail: 'ตรวจการติดเชื้อไวรัสตับอักเสบบี',
          cgd_code: '36330',
          type: 'mt',
          disburseable: 200,
          cost: 200
        },
        {
          treatment_id: 40,
          treatment_name: 'Anti-HIV',
          detail: 'ตรวจคัดกรองการติดเชื้อเฮชไอวี',
          cgd_code: '36350',
          type: 'mt',
          disburseable: 250,
          cost: 250
        },
        {
          treatment_id: 41,
          treatment_name: 'VDRL',
          detail: 'ตรวจคัดกรองโรคซิฟิลิส',
          cgd_code: '36003',
          type: 'mt',
          disburseable: 50,
          cost: 50
        },
        {
          treatment_id: 42,
          treatment_name: 'TPHA',
          detail: 'ตรวจยืนยันโรคซิฟิลิส',
          cgd_code: '36006',
          type: 'mt',
          disburseable: 100,
          cost: 100
        },
        {
          treatment_id: 43,
          treatment_name: 'T3',
          detail: 'ตรวจการทำงานของต่อมไทรอยด์',
          cgd_code: '32611',
          type: 'mt',
          disburseable: 200,
          cost: 200
        },
        {
          treatment_id: 44,
          treatment_name: 'T4',
          detail: 'ตรวจการทำงานของต่อมไทรอยด์',
          cgd_code: '32609',
          type: 'mt',
          disburseable: 180,
          cost: 180
        },
        {
          treatment_id: 45,
          treatment_name: 'FT3',
          detail: 'ตรวจการทำงานของต่อมไทรอยด์',
          cgd_code: '32612',
          type: 'mt',
          disburseable: 200,
          cost: 200
        },
        {
          treatment_id: 46,
          treatment_name: 'FT4',
          detail: 'ตรวจการทำงานของต่อมไทรอยด์',
          cgd_code: '32610',
          type: 'mt',
          disburseable: 200,
          cost: 200
        },
        {
          treatment_id: 47,
          treatment_name: 'TSH',
          detail: 'ตรวจการทำงานของต่อมไทรอยด์',
          cgd_code: '32608',
          type: 'mt',
          disburseable: 200,
          cost: 200
        },
        {
          treatment_id: 48,
          treatment_name: 'Rubella IgG',
          detail: 'ตรวจหาภูมิคุ้มกันหัดเยอรมัน',
          cgd_code: '36660',
          type: 'mt',
          disburseable: 200,
          cost: 400
        },
        {
          treatment_id: 49,
          treatment_name: 'AFP',
          detail: 'ตรวจคัดกรองสารบ่งชี้มะเร็งตับ',
          cgd_code: '37302',
          type: 'mt',
          disburseable: 270,
          cost: 270
        },
        {
          treatment_id: 50,
          treatment_name: 'CEA',
          detail: 'ตรวจคัดกรองสารบ่งชี้มะเร็งลำไส้',
          cgd_code: '37308',
          type: 'mt',
          disburseable: 300,
          cost: 300
        },
        {
          treatment_id: 51,
          treatment_name: 'PSA',
          detail: 'ตรวจคัดกรองสารบ่งชี้มะเร็งต่อมลูกหมาก',
          cgd_code: '37310',
          type: 'mt',
          disburseable: 300,
          cost: 600
        },
        {
          treatment_id: 52,
          treatment_name: 'CA125',
          detail: 'ตรวจคัดกรองสารบ่งชี้มะเร็งรังไข่',
          cgd_code: '37306',
          type: 'mt',
          disburseable: 600,
          cost: 700
        },
        {
          treatment_id: 53,
          treatment_name: 'CA19-9',
          detail: 'ตรวจคัดกรองสารบ่งชี้มะเร็งตับอ่อนและท่อน้ำดี',
          cgd_code: '37307',
          type: 'mt',
          disburseable: 600,
          cost: 700
        },
        {
          treatment_id: 54,
          treatment_name: 'CA 15-3',
          detail: 'ตรวจคัดกรองสารบ่งชี้มะเร็งเต้านม',
          cgd_code: '37314',
          type: 'mt',
          disburseable: 400,
          cost: 980
        },
        {
          treatment_id: 55,
          treatment_name: 'CRP',
          detail: 'ตรวจประเมินการอักเสบของร่างกาย',
          cgd_code: '37104',
          type: 'mt',
          disburseable: 170,
          cost: 250
        },
        {
          treatment_id: 56,
          treatment_name: 'Leptospira-Ab',
          detail: 'ตรวจการติดเชื้อเลปโตสไปโรสิส',
          cgd_code: '36007',
          type: 'mt',
          disburseable: 0,
          cost: 400
        },
        {
          treatment_id: 57,
          treatment_name: 'Troponin I',
          detail: 'ตรวจประเมินภาวะกล้ามเนื้อหัวใจขาดเลือด',
          cgd_code: '32307',
          type: 'mt',
          disburseable: 0,
          cost: 260
        },
        {
          treatment_id: 58,
          treatment_name: 'CK',
          detail: 'ตรวจประเมินสภาวะของหัวใจ กล้ามเนื้อ และสมอง',
          cgd_code: '32305',
          type: 'mt',
          disburseable: 90,
          cost: 400
        },
        {
          treatment_id: 59,
          treatment_name: 'Beta-HCG',
          detail: 'ตรวจวัดระดับฮอร์โมน hCG ในเลือด',
          cgd_code: '37303',
          type: 'mt',
          disburseable: 270,
          cost: 420
        },
        {
          treatment_id: 60,
          treatment_name: 'Estrogen',
          detail: 'ตรวจวัดระดับฮอร์โมนเพศหญิง',
          cgd_code: '32618',
          type: 'mt',
          disburseable: 300,
          cost: 630
        },
        {
          treatment_id: 61,
          treatment_name: 'Progesterone',
          detail: 'ตรวจวัดระดับฮอร์โมนเพศหญิง',
          cgd_code: '32619',
          type: 'mt',
          disburseable: 250,
          cost: 560
        },
        {
          treatment_id: 62,
          treatment_name: 'HAV Ab (IgM)',
          detail: 'ตรวจหาภูมิคุ้มกันไวรัสตับอักเสบเอ',
          cgd_code: '36302',
          type: 'mt',
          disburseable: 500,
          cost: 700
        },
        {
          treatment_id: 63,
          treatment_name: 'Testosterone',
          detail: 'ตรวจวัดระดับฮอร์โมนเพศชาย',
          cgd_code: '32620',
          type: 'mt',
          disburseable: 250,
          cost: 650
        },
        {
          treatment_id: 64,
          treatment_name: 'FSH',
          detail: 'ตรวจะดับฮอร์โมนกระตุ้นการเจริญของรังไข่',
          cgd_code: '32616',
          type: 'mt',
          disburseable: 250,
          cost: 300
        },
        {
          treatment_id: 65,
          treatment_name: 'Vit D',
          detail: 'ระดับวิตามินดีในเลือด',
          cgd_code: null,
          type: 'mt',
          disburseable: 1000,
          cost: 1700
        },
        {
          treatment_id: 66,
          treatment_name: 'Widal test',
          detail: 'การตรวจหาเชื้อไทฟอยด์',
          cgd_code: '36020',
          type: 'mt',
          disburseable: 100,
          cost: 140
        },
        {
          treatment_id: 67,
          treatment_name: 'Stool C/S',
          detail: 'การตรวจเพาะเชื้อจากอุจจาระ ',
          cgd_code: null,
          type: 'mt',
          disburseable: 200,
          cost: 380
        },
        {
          treatment_id: 68,
          treatment_name: 'Prolactin',
          detail: 'ตรวจระดับฮอร์โมนโพรแลคติน',
          cgd_code: '32622',
          type: 'mt',
          disburseable: 300,
          cost: 490
        },
        // pt
        {
          treatment_id: 69,
          treatment_name: 'Evaluation and planning of physical therapy',
          detail: 'ตรวจประเมินและวางแผนการรักษาทางกายภาพบำบัด',
          cgd_code: null,
          type: 'pt',
          cost: 0,
          disburseable: 0
        },
        {
          treatment_id: 70,
          treatment_name: 'Hydrocollator',
          detail: 'การประคบร้อน',
          cgd_code: null,
          type: 'pt',
          cost: 60,
          disburseable: 0
        },
        {
          treatment_id: 71,
          treatment_name: 'Cryotherapy',
          detail: 'การประคบเย็น',
          cgd_code: null,
          type: 'pt',
          cost: 60,
          disburseable: 0
        },
        {
          treatment_id: 72,
          treatment_name: 'Electrical Stimulation / TENS',
          cgd_code: null,
          type: 'pt',
          cost: 60,
          disburseable: 0
        },
        { treatment_id: 73, treatment_name: 'Ultrasound (US)', cgd_code: null, type: 'pt', cost: 120, disburseable: 0 },
        { treatment_id: 74, treatment_name: 'Lasertherapy', cgd_code: null, type: 'pt', cost: 60, disburseable: 0 },
        { treatment_id: 75, treatment_name: 'Paraffin bath', cgd_code: null, type: 'pt', cost: 80, disburseable: 0 },
        {
          treatment_id: 76,
          treatment_name: 'Acupressure&massage',
          cgd_code: null,
          type: 'pt',
          cost: 80,
          disburseable: 0
        },
        { treatment_id: 77, treatment_name: 'Taping', cgd_code: null, type: 'pt', cost: 170, disburseable: 0 },
        {
          treatment_id: 78,
          treatment_name: 'exercise therapy / strenghtening / stretching',
          cgd_code: null,
          type: 'pt',
          cost: 80,
          disburseable: 0
        },
        { treatment_id: 79, treatment_name: 'Home program', cgd_code: null, type: 'pt', cost: 100, disburseable: 0 },
        { treatment_id: 80, treatment_name: 'CP training', cgd_code: null, type: 'pt', cost: 100, disburseable: 0 },
        { treatment_id: 81, treatment_name: 'Tilt table', cgd_code: null, type: 'pt', cost: 80, disburseable: 0 },
        {
          treatment_id: 82,
          treatment_name: 'Ambulation training',
          cgd_code: null,
          type: 'pt',
          cost: 80,
          disburseable: 0
        },
        {
          treatment_id: 83,
          treatment_name: 'Cervical traction',
          cgd_code: null,
          type: 'pt',
          cost: 140,
          disburseable: 0
        },
        { treatment_id: 84, treatment_name: 'Pelvic traction', cgd_code: null, type: 'pt', cost: 140, disburseable: 0 },
        { treatment_id: 85, treatment_name: 'Passive movement', cgd_code: null, type: 'pt', cost: 80, disburseable: 0 },
        {
          treatment_id: 86,
          treatment_name: 'manipulation/mobilization',
          cgd_code: null,
          type: 'pt',
          cost: 80,
          disburseable: 0
        },
        {
          treatment_id: 87,
          treatment_name: 'Microwave Diathermy',
          detail: 'การบำบัดด้วยไมโครเวฟ',
          cgd_code: null,
          type: 'pt',
          cost: 70,
          disburseable: 0
        },
        //
        {
          treatment_id: 88,
          treatment_name: 'Thai Massage',
          detail: 'นวกไทย',
          cgd_code: null,
          type: 'tm',
          cost: 250,
          disburseable: 0
        }
      ]);
    });
};

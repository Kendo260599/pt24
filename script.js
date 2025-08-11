/* =================== Danh mục phường/xã Đồng Nai (có thể bổ sung) =================== */
const WARD_DATA_DONG_NAI = {
  'Thành phố Biên Hòa': ['An Bình','An Hòa','Bửu Hòa','Bửu Long','Bình Đa','Hóa An','Hiệp Hòa','Hố Nai','Long Bình','Long Bình Tân','Phước Tân','Quang Vinh','Quyết Thắng','Tam Hiệp','Tam Hòa','Tân Biên','Tân Hạnh','Tân Hiệp','Tân Hòa','Tân Phong','Tân Tiến','Tân Vạn','Thanh Bình','Trảng Dài','Trung Dũng'],
  'Thành phố Long Khánh': ['Bảo Vinh','Bảo Quang','Bàu Sen','Suối Tre','Xuân An','Xuân Bình','Xuân Hòa','Xuân Lập','Xuân Tân','Xuân Thanh','Xuân Trung','Phú Bình'],
  'Huyện Long Thành': ['Long Thành (TT)','An Phước','Bàu Cạn','Bình An','Bình Sơn','Cẩm Đường','Lộc An','Long An','Long Đức','Long Phước','Phước Bình','Phước Thái','Suối Trầu','Tam An','Tân Hiệp'],
  'Huyện Nhơn Trạch': ['Hiệp Phước','Long Tân','Long Thọ','Phú Đông','Phú Hội','Phú Hữu','Phú Thạnh','Phú Thanh','Phước An','Phước Khánh','Phước Thiền','Vĩnh Thanh'],
  'Huyện Vĩnh Cửu': ['Vĩnh An (TT)','Bình Hòa','Bình Lợi','Hiếu Liêm','Mã Đà','Phú Lý','Tân An','Tân Bình','Thạnh Phú','Thiện Tân','Trị An'],
  'Huyện Trảng Bom': ['Trảng Bom (TT)','An Viễn','Bàu Hàm','Bắc Sơn','Bình Minh','Cây Gáo','Đồi 61','Đông Hòa','Giang Điền','Hố Nai 3','Hưng Thịnh','Quảng Tiến','Sông Trầu','Tây Hòa','Thanh Hòa'],
  'Huyện Thống Nhất': ['Dầu Giây (TT)','Bàu Hàm 2','Gia Kiệm','Gia Tân 1','Gia Tân 2','Gia Tân 3','Hưng Lộc','Lộ 25','Quang Trung','Xuân Thạnh'],
  'Huyện Cẩm Mỹ': ['Sông Ray (TT)','Lâm San','Long Giao','Nhân Nghĩa','Sông Nhạn','Thừa Đức','Xuân Bảo','Xuân Đông','Xuân Quế'],
  'Huyện Định Quán': ['Định Quán (TT)','Gia Canh','La Ngà','Ngọc Định','Phú Cường','Phú Hòa','Phú Lợi','Phú Ngọc','Phú Tân','Phú Túc','Phú Vinh','Suối Nho','Thanh Sơn','Túc Trưng'],
  'Huyện Tân Phú': ['Tân Phú (TT)','Đắc Lua','Đồng Nai','Nam Cát Tiên','Núi Tượng','Phú An','Phú Bình','Phú Điền','Phú Lập','Phú Lộc','Phú Sơn','Phú Thịnh','Phú Trung','Phú Xuân','Tà Lài','Thanh Sơn','Trà Cổ'],
  'Huyện Xuân Lộc': ['Gia Ray (TT)','Bảo Hòa','Lang Minh','Suối Cát','Suối Cao','Xuân Bắc','Xuân Định','Xuân Hiệp','Xuân Hòa','Xuân Hưng','Xuân Phú','Xuân Tâm','Xuân Thành','Xuân Thọ','Xuân Trường']
};
const WARD_STORE_KEY = 'dongnai_wards_user_add_v1';
function loadUserAddedWards(){ try{return JSON.parse(localStorage.getItem(WARD_STORE_KEY)||'{}')}catch{return{}} }
function saveUserAddedWard(d,w){ const data=loadUserAddedWards(); if(!data[d])data[d]=[]; if(!data[d].includes(w))data[d].push(w); localStorage.setItem(WARD_STORE_KEY,JSON.stringify(data)); }
function getWardOptionsForDistrict(d){ const base=WARD_DATA_DONG_NAI[d]||[]; const extra=loadUserAddedWards()[d]||[]; return [...new Set([...base,...extra])].sort((a,b)=>a.localeCompare(b,'vi')); }
function populateDistricts(){ const sel=document.getElementById('bd-district'); sel.innerHTML=Object.keys(WARD_DATA_DONG_NAI).sort((a,b)=>a.localeCompare(b,'vi')).map(d=>`<option value="${d}">${d}</option>`).join(''); }
function populateWards(d){ const sel=document.getElementById('bd-ward'); const wards=getWardOptionsForDistrict(d); const opts=wards.map(w=>`<option value="${w}">${w}</option>`); opts.push('<option value="__other__">Khác (nhập tay)</option>'); sel.innerHTML=opts.join(''); sel.value=wards[0]||'__other__'; toggleWardCustom(sel.value==='__other__'); }
function toggleWardCustom(show){ document.getElementById('ward-custom-wrap').style.display = show ? 'block':'none'; }

/* =================== Tiện ích chung =================== */
const STORAGE_KEY='ptpro_profiles_v3';
const getProfiles=()=>JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');
const setProfiles=arr=>localStorage.setItem(STORAGE_KEY,JSON.stringify(arr));
const uuid=()=> (crypto?.randomUUID ? crypto.randomUUID() : 'id_'+Date.now()+Math.random().toString(16).slice(2));
function normalizePhone(p){ p=(p||'').replace(/[^\d+]/g,'').trim(); if(p.startsWith('+84'))return p; if(p.startsWith('0')&&p.length>=9)return '+84'+p.slice(1); return p; }
function isValidPhone(p){ p=normalizePhone(p); const vn=/^\+?84(3|5|7|8|9)\d{8}$/; const g=/^\+?\d{8,13}$/; return vn.test(p)||g.test(p); }

/* =================== Phong thủy cốt lõi =================== */
function parseDateParts(s){ if(!s||typeof s!=='string') throw new Error('Ngày sinh không hợp lệ'); s=s.trim(); const sep=s.includes('-')?'-':(s.includes('/')?'/':null); if(!sep) throw new Error('Định dạng ngày phải có "-" hoặc "/"'); const a=s.split(sep).map(x=>parseInt(x,10)); if(a.length!==3||a.some(isNaN)) throw new Error('Định dạng ngày không đúng'); if(a[0]>31) return {year:a[0],month:a[1],day:a[2]}; return {year:a[2],month:a[1],day:a[0]}; }
function getEffectiveBirthYear(b){ const {year,month,day}=parseDateParts(b); if(month<3||(month===3&&day<=13)) return year-1; return year; }
const MALE_START=1921,FEMALE_START=1922;
const MALE_SEQ=['Đoài','Càn','Khôn','Tốn','Chấn','Khôn','Khảm','Ly','Cấn'];
const FEMALE_SEQ=['Cấn','Khảm','Ly','Tốn','Chấn','Khôn','Càn','Đoài','Cấn'];
const mod9=n=>((n%9)+9)%9;
function getCungMenh(birth,gender){
  const eff=getEffectiveBirthYear(birth);
  const idx=mod9(eff-(gender==='nam'?MALE_START:FEMALE_START));
  const cung=(gender==='nam'?MALE_SEQ:FEMALE_SEQ)[idx];
  const info={
    'Càn':{nguyenTo:'Kim',huong:'Tây Bắc'},'Khôn':{nguyenTo:'Thổ',huong:'Tây Nam'},'Cấn':{nguyenTo:'Thổ',huong:'Đông Bắc'},
    'Chấn':{nguyenTo:'Mộc',huong:'Đông'},'Tốn':{nguyenTo:'Mộc',huong:'Đông Nam'},'Ly':{nguyenTo:'Hỏa',huong:'Nam'},
    'Khảm':{nguyenTo:'Thủy',huong:'Bắc'},'Đoài':{nguyenTo:'Kim',huong:'Tây'}
  }[cung];
  const nhomTr=['Khảm','Ly','Chấn','Tốn'].includes(cung)?'Đông Tứ Trạch':'Tây Tứ Trạch';
  return {effectiveYear:eff,cung,nhomTrach:nhomTr,...info};
}
function getBatTrachForCung(cung){
  const C={good:{'Sinh Khí':{ten:'Sinh Khí',loai:'good',y:'Tài lộc, thăng tiến.'},'Thiên Y':{ten:'Thiên Y',loai:'good',y:'Sức khỏe, quý nhân.'},'Diên Niên':{ten:'Diên Niên',loai:'good',y:'Hòa thuận.'},'Phục Vị':{ten:'Phục Vị',loai:'good',y:'Ổn định, học hành.'}},
           bad:{'Tuyệt Mệnh':{ten:'Tuyệt Mệnh',loai:'bad',y:'Nặng nhất.'},'Ngũ Quỷ':{ten:'Ngũ Quỷ',loai:'bad',y:'Thị phi.'},'Lục Sát':{ten:'Lục Sát',loai:'bad',y:'Kiện tụng.'},'Họa Hại':{ten:'Họa Hại',loai:'bad',y:'Xui xẻo.'}}};
  const B={'Khảm':{'Đông Nam':C.good['Sinh Khí'],'Đông':C.good['Thiên Y'],'Nam':C.good['Diên Niên'],'Bắc':C.good['Phục Vị'],'Tây Nam':C.bad['Tuyệt Mệnh'],'Đông Bắc':C.bad['Ngũ Quỷ'],'Tây Bắc':C.bad['Lục Sát'],'Tây':C.bad['Họa Hại']},
           'Ly':{'Đông':C.good['Sinh Khí'],'Đông Nam':C.good['Thiên Y'],'Bắc':C.good['Diên Niên'],'Nam':C.good['Phục Vị'],'Tây Bắc':C.bad['Tuyệt Mệnh'],'Tây':C.bad['Ngũ Quỷ'],'Tây Nam':C.bad['Lục Sát'],'Đông Bắc':C.bad['Họa Hại']},
           'Chấn':{'Nam':C.good['Sinh Khí'],'Bắc':C.good['Thiên Y'],'Đông Nam':C.good['Diên Niên'],'Đông':C.good['Phục Vị'],'Tây':C.bad['Tuyệt Mệnh'],'Tây Bắc':C.bad['Ngũ Quỷ'],'Đông Bắc':C.bad['Lục Sát'],'Tây Nam':C.bad['Họa Hại']},
           'Tốn':{'Bắc':C.good['Sinh Khí'],'Nam':C.good['Thiên Y'],'Đông':C.good['Diên Niên'],'Đông Nam':C.good['Phục Vị'],'Đông Bắc':C.bad['Tuyệt Mệnh'],'Tây Nam':C.bad['Ngũ Quỷ'],'Tây':C.bad['Lục Sát'],'Tây Bắc':C.bad['Họa Hại']},
           'Càn':{'Tây':C.good['Sinh Khí'],'Đông Bắc':C.good['Thiên Y'],'Tây Nam':C.good['Diên Niên'],'Tây Bắc':C.good['Phục Vị'],'Nam':C.bad['Tuyệt Mệnh'],'Đông':C.bad['Ngũ Quỷ'],'Bắc':C.bad['Lục Sát'],'Đông Nam':C.bad['Họa Hại']},
           'Khôn':{'Đông Bắc':C.good['Sinh Khí'],'Tây':C.good['Thiên Y'],'Tây Bắc':C.good['Diên Niên'],'Tây Nam':C.good['Phục Vị'],'Bắc':C.bad['Tuyệt Mệnh'],'Đông Nam':C.bad['Ngũ Quỷ'],'Nam':C.bad['Lục Sát'],'Đông':C.bad['Họa Hại']},
           'Cấn':{'Tây Nam':C.good['Sinh Khí'],'Tây Bắc':C.good['Thiên Y'],'Tây':C.good['Diên Niên'],'Đông Bắc':C.good['Phục Vị'],'Đông Nam':C.bad['Tuyệt Mệnh'],'Bắc':C.bad['Ngũ Quỷ'],'Đông':C.bad['Lục Sát'],'Nam':C.bad['Họa Hại']},
           'Đoài':{'Tây Bắc':C.good['Sinh Khí'],'Tây Nam':C.good['Thiên Y'],'Đông Bắc':C.good['Diên Niên'],'Tây':C.good['Phục Vị'],'Đông':C.bad['Tuyệt Mệnh'],'Nam':C.bad['Ngũ Quỷ'],'Đông Nam':C.bad['Lục Sát'],'Bắc':C.bad['Họa Hại']}};
  return B[cung];
}
function analyzeHouseDirection(cung,huong){ const t=getBatTrachForCung(cung); const all=Object.entries(t).map(([h,i])=>({huong:h,...i})); return {selected:t[huong],goods:all.filter(i=>i.loai==='good'),bads:all.filter(i=>i.loai==='bad')}; }
const ZODIAC=['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
const idxZ=y=>((y-4)%12+12)%12, nameZ=y=>ZODIAC[idxZ(y)];
const TTG=[{group:['Thân','Tý','Thìn'],tamTai:['Dần','Mão','Thìn']},{group:['Dần','Ngọ','Tuất'],tamTai:['Thân','Dậu','Tuất']},{group:['Hợi','Mão','Mùi'],tamTai:['Tỵ','Ngọ','Mùi']},{group:['Tỵ','Dậu','Sửu'],tamTai:['Hợi','Tý','Sửu']}];
function tuoiMu(eff,year){return year-eff+1}
function checkKimLau(t){let r=t%9;if(r===0)r=9;const m={1:'Kim Lâu Thân',3:'Kim Lâu Thê',6:'Kim Lâu Tử',8:'Kim Lâu Lục Súc'};return {isKimLau:[1,3,6,8].includes(r),type:m[r]||null}}
function checkHoangOc(t){const lb=['Nhất Cát','Nhì Nghi','Tam Địa Sát','Tứ Tấn Tài','Ngũ Thọ Tử','Lục Hoang Ốc'];const m=t%6;const i=(m===0)?5:m-1;const n=lb[i];return {name:n,isBad:['Tam Địa Sát','Ngũ Thọ Tử','Lục Hoang Ốc'].includes(n)}}
function checkTamTai(ownerYear,year){const o=nameZ(ownerYear),c=nameZ(year),g=TTG.find(x=>x.group.includes(o));return {isTamTai:g?g.tamTai.includes(c):false,yearChi:c}}
function checkXungTuoi(ownerYear,year){const opp=(idxZ(ownerYear)+6)%12;return {isXung:idxZ(year)===opp,opp:ZODIAC[opp],yearChi:nameZ(year)}}
function elemYear(y){const s=((y-4)%10+10)%10; if(s===0||s===1)return'Mộc'; if(s===2||s===3)return'Hỏa'; if(s===4||s===5)return'Thổ'; if(s===6||s===7)return'Kim'; return'Thủy';}
const KHAC={'Mộc':'Thổ','Thổ':'Thủy','Thủy':'Hỏa','Hỏa':'Kim','Kim':'Mộc'};
function elemConflict(a,b){return a&&b&&(KHAC[a]===b||KHAC[b]===a)}
function evaluateBuildTime(birth,gender,year,month){
  const cung=getCungMenh(birth,gender); const age=tuoiMu(cung.effectiveYear,year);
  const kl=checkKimLau(age), ho=checkHoangOc(age), tt=checkTamTai(cung.effectiveYear,year), x=checkXungTuoi(cung.effectiveYear,year);
  const yE=elemYear(year), mE=[null,'Thủy',null,'Hỏa','Thổ','Kim','Mộc',null,'Hỏa','Thổ','Kim','Mộc','Thủy'][month]||null;
  const warnings=[]; if(kl.isKimLau)warnings.push(`Phạm Kim Lâu (${kl.type}).`); if(ho.isBad)warnings.push(`Phạm Hoang Ốc (${ho.name}).`); if(tt.isTamTai)warnings.push(`Phạm Tam Tai (${tt.yearChi}).`); if(x.isXung)warnings.push(`Xung tuổi với năm ${year} (đối xung ${x.opp}).`); if(elemConflict(cung.nguyenTo,yE))warnings.push(`Cung (${cung.nguyenTo}) khắc Ngũ hành năm (${yE}).`);
  const monthWarnings=[]; if(elemConflict(cung.nguyenTo,mE))monthWarnings.push(`Tháng ${month} xung ngũ hành (${mE}) với Cung (${cung.nguyenTo}).`);
  return {cung,ageMu:age,yearElement:yE,monthElement:mE,warnings,monthWarnings};
}

/* =================== Issues (50+ lỗi môi trường & hóa giải) =================== */
const ISSUES=[
  // Ngoại cảnh
  {id:'hospital',cat:'Ngoại cảnh',label:'Đối diện/gần Bệnh viện',impact:'Âm khí, lo lắng, ảnh hưởng sức khỏe.',remedy:'Tăng cây xanh, ánh sáng ấm, rèm dày; bình phong; cân nhắc Bát Quái lồi.'},
  {id:'cemetery',cat:'Ngoại cảnh',label:'Gần nghĩa trang/nhà tang lễ',impact:'Âm khí nặng, khó tụ tài.',remedy:'Hàng rào kín, cây tán dày, đèn ấm; hạn chế cửa nhìn thẳng.'},
  {id:'crematorium',cat:'Ngoại cảnh',label:'Gần lò hỏa táng',impact:'Ám khí, bất an.',remedy:'Che chắn mạnh (cây, tường), nước + đá cân bằng, màu ấm.'},
  {id:'temple',cat:'Ngoại cảnh',label:'Đối diện Chùa',impact:'Khí tĩnh/âm, giảm tài khí.',remedy:'Quan Công gần cửa, chuông gió kim loại, tránh nhìn thẳng.'},
  {id:'church',cat:'Ngoại cảnh',label:'Đối diện Nhà thờ',impact:'Khí tĩnh, giờ lễ ồn.',remedy:'Bình phong, rèm dày, dùng cửa phụ nếu cần.'},
  {id:'school',cat:'Ngoại cảnh',label:'Đối diện Trường học',impact:'Ồn, khí động mạnh.',remedy:'Vách ngăn, rèm cách âm, bố trí ngủ lùi sâu.'},
  {id:'market',cat:'Ngoại cảnh',label:'Sát chợ/siêu thị ồn',impact:'Khí tạp, mất riêng tư.',remedy:'Cửa 2 lớp, hàng rào, cây “lọc khí”.'},
  {id:'gas',cat:'Ngoại cảnh',label:'Gần trạm xăng/kho gas',impact:'Hỏa khí, nguy cơ cháy nổ.',remedy:'Khoảng cách an toàn, tường chống cháy, không mở cửa trực diện.'},
  {id:'transformer',cat:'Ngoại cảnh',label:'Gần trạm biến áp',impact:'Từ trường, ồn.',remedy:'Lùi cổng/cửa, tường đặc, cây cao; tránh kê giường sát.'},
  {id:'pylon',cat:'Ngoại cảnh',label:'Cột điện trước cổng',impact:'Sát khí, cản khí.',remedy:'Lùi cổng, cây cao, bình phong; đổi hướng cửa nếu được.'},
  {id:'bts',cat:'Ngoại cảnh',label:'Cột BTS/anten',impact:'Từ trường, thị giác xấu.',remedy:'Che chắn cây, mái; hạn chế cửa nhìn thẳng.'},
  {id:'deadend',cat:'Ngoại cảnh',label:'Hẻm cụt/hồi dương sát',impact:'Khí bí, đọng xấu.',remedy:'Đèn sáng, cây/đá/nước ở đầu nhà, cửa phụ lấy gió.'},
  {id:'T_cross',cat:'Ngoại cảnh',label:'Ngã ba chữ T đâm thẳng',impact:'Trực sát hao tài.',remedy:'Bình phong, bậc cấp gãy dòng, cây to; cân nhắc Bát Quái lồi.'},
  {id:'Y_cross',cat:'Ngoại cảnh',label:'Ngã ba chữ Y',impact:'Khí loạn, phân tán.',remedy:'Cổng kín, hiên che, điều hướng lối đi, cây đệm.'},
  {id:'crossroad',cat:'Ngoại cảnh',label:'Ngã tư lớn/cao tốc',impact:'Khí động mạnh, bụi.',remedy:'Lam chắn gió, cây tán, kính cách âm.'},
  {id:'curve_blade',cat:'Ngoại cảnh',label:'Đường cong gấp “lưỡi đao”',impact:'Hình sát chém.',remedy:'Bình phong, cây che, tường cong mềm, đổi cửa.'},
  {id:'rail',cat:'Ngoại cảnh',label:'Sát đường tàu',impact:'Rung, ồn, xung khí.',remedy:'Chống ồn/rung, cây đệm, công năng ngủ lùi sâu.'},
  {id:'underbridge',cat:'Ngoại cảnh',label:'Dưới chân cầu',impact:'Thiếu sáng, áp lực.',remedy:'Tăng sáng, cây xanh, màu ấm, tránh phòng ngủ phía đó.'},
  {id:'slope',cat:'Ngoại cảnh',label:'Đường dốc trước nhà',impact:'Khí trượt khó tụ.',remedy:'Bậc thềm, bồn cây bậc cấp, cửa lệch + bình phong.'},
  {id:'lowfloor',cat:'Ngoại cảnh',label:'Nền thấp hơn đường',impact:'Ngập nước, khí xấu tràn.',remedy:'Nâng cốt nền, rãnh thoát nước, bậc cấp.'},
  {id:'highfloor',cat:'Ngoại cảnh',label:'Nền quá cao so với đường',impact:'Khó dẫn khí, dốc nguy.',remedy:'Thiết kế bậc thoải, tiểu cảnh mềm chuyển tiếp.'},
  {id:'sharpcorner',cat:'Ngoại cảnh',label:'Góc nhọn công trình chĩa vào',impact:'Hình sát đâm.',remedy:'Cây/bình phong, điều chỉnh cửa.'},
  {id:'river_back',cat:'Ngoại cảnh',label:'Sông/hồ ở phía sau',impact:'Thủy sau nhà dễ bất ổn.',remedy:'Hàng rào, cây, không mở cửa lớn phía sau.'},
  {id:'polluted',cat:'Ngoại cảnh',label:'Mương/cống ô nhiễm',impact:'Uế khí, bệnh tật.',remedy:'Che kín, xử lý mùi, không mở cửa sát.'},
  {id:'streetlight',cat:'Ngoại cảnh',label:'Đèn đường rọi thẳng cửa',impact:'Quang sát, khó ngủ.',remedy:'Rèm dày, lam che, cây tán.'},

  // Lô đất / hình thế
  {id:'lot_triangle',cat:'Lô đất',label:'Đất hình tam giác',impact:'Khó tụ tài, hình sát.',remedy:'Cắt chỉnh, chừa sân/bồn cây ở đỉnh.'},
  {id:'lot_arrow',cat:'Lô đất',label:'Đất như mũi tên/dao',impact:'Họa hại hình sát.',remedy:'Bo tròn/gãy góc, tiểu cảnh mềm.'},
  {id:'lot_thinlong',cat:'Lô đất',label:'Đất thon dài quá mức',impact:'Khí kém phân bổ.',remedy:'Chia khoang, giếng trời/cửa trung gian.'},
  {id:'lot_thophau',cat:'Lô đất',label:'Thóp hậu',impact:'Tán tài, bức bối.',remedy:'Công năng phụ phía sau, mở sáng gió, tiểu cảnh cuối.'},
  {id:'lot_missing_corner',cat:'Lô đất',label:'Khuyết góc quan trọng',impact:'Thiếu phương vị.',remedy:'Bù bằng mái/ban công, cây, gương.'},

  // Cửa – cầu thang – dòng khí
  {id:'door_back',cat:'Cửa & khí',label:'Cửa chính thẳng cửa hậu',impact:'Khí tuột ra.',remedy:'Bình phong, đổi lệch cửa, thảm/tiểu cảnh giữa nhà.'},
  {id:'door_stair',cat:'Cửa & khí',label:'Cửa chính đụng cầu thang',impact:'Khí xung, tán tài.',remedy:'Bậc đệm, bình phong, đổi tay vịn/bậc đầu.'},
  {id:'stair_center',cat:'Cửa & khí',label:'Cầu thang giữa nhà',impact:'Động trung cung.',remedy:'Dịch vị trí, giếng trời + cây giảm động.'},
  {id:'stair_out',cat:'Cửa & khí',label:'Cầu thang đổ thẳng cửa',impact:'Tài khí thoát.',remedy:'Chiếu nghỉ, bình phong, chậu cây chân thang.'},
  {id:'corridor_wind',cat:'Cửa & khí',label:'Hành lang thẳng hàng cửa',impact:'Gió xộc, khó tụ.',remedy:'Lam/bình phong, thảm, cửa so le.'},
  {id:'door_face_door',cat:'Cửa & khí',label:'Cửa nhà đối cửa nhà khác',impact:'Khí đối đấu.',remedy:'Cửa lệch, cây tán, rèm che.'},
  {id:'wc_face_main',cat:'Cửa & khí',label:'Cửa WC đối cửa chính',impact:'Uế khí xông nhà.',remedy:'Đổi hướng cửa, bình phong, hút mùi.'},

  // Kết cấu – xà, cột, gương
  {id:'beam_over',cat:'Kết cấu',label:'Xà ngang đè giường/sofa/bàn',impact:'Áp khí, mất ngủ.',remedy:'Trần giả che xà, đổi vị trí kê.'},
  {id:'pillar_corner',cat:'Kết cấu',label:'Cột/góc nhọn chĩa vào',impact:'Hình sát.',remedy:'Bo góc, tủ/kệ che, cây mềm.'},
  {id:'mirror_bed',cat:'Kết cấu',label:'Gương chiếu thẳng giường',impact:'Bất an.',remedy:'Di dời gương, dùng gương trong tủ.'},
  {id:'mirror_main',cat:'Kết cấu',label:'Gương đối cửa chính',impact:'Đẩy khí ra.',remedy:'Đặt lệch/đặt trong nhà.'},
  {id:'fan_over_bed',cat:'Kết cấu',label:'Quạt trần trên giường',impact:'Áp/đứt khí.',remedy:'Dời quạt, dùng quạt đứng/treo tường.'},

  // Bếp
  {id:'sink_stove',cat:'Bếp',label:'Bồn rửa sát/đối bếp',impact:'Thủy – Hỏa xung.',remedy:'Cách 60–80cm, chen vật trung gian (gỗ/đá).'},
  {id:'stove_window',cat:'Bếp',label:'Bếp lưng tựa cửa sổ',impact:'Gió thổi Hỏa.',remedy:'Che chắn, đổi vị trí, hút mùi.'},
  {id:'stove_on_septic',cat:'Bếp',label:'Bếp trên bể phốt/ống thoát',impact:'Uế – Hỏa.',remedy:'Đổi vị trí, cách ly kỹ thuật.'},
  {id:'stove_taybac',cat:'Bếp',label:'Bếp tại Tây Bắc',impact:'Thiên môn hỏa (khắc trưởng bối).',remedy:'Giảm Hỏa (vật liệu/màu), tăng Kim/Thủy; cân nhắc dời.'},

  // WC – Phòng ngủ
  {id:'wc_center',cat:'WC/Ngủ',label:'WC ở trung cung',impact:'Uế giữa nhà.',remedy:'Dời vị trí, thông gió mạnh, lọc mùi.'},
  {id:'wc_over_kitchen',cat:'WC/Ngủ',label:'WC trên bếp/ban thờ',impact:'Uế khắc Hỏa/Thổ.',remedy:'Đổi khu kỹ thuật, chống thấm kỹ.'},
  {id:'wc_over_bed',cat:'WC/Ngủ',label:'WC trên phòng ngủ',impact:'Ẩm mốc, bệnh vặt.',remedy:'Gia cố chống ẩm + thông gió mạnh.'},
  {id:'wc_face_stove',cat:'WC/Ngủ',label:'Cửa WC đối bếp',impact:'Uế – Hỏa xung.',remedy:'Đổi cửa, bình phong, hút mùi.'},
  {id:'bed_line_door',cat:'WC/Ngủ',label:'Giường thẳng cửa',impact:'Bị xung, giật mình.',remedy:'Đổi vị trí, bình phong chân giường.'},
  {id:'bed_under_beam',cat:'WC/Ngủ',label:'Giường dưới xà',impact:'Áp khí.',remedy:'Trần giả, đổi chỗ.'},
  {id:'bed_west_heat',cat:'WC/Ngủ',label:'Phòng ngủ tây nắng gắt',impact:'Nhiệt hỏa, khó ngủ.',remedy:'Film cách nhiệt, lam che, màu mát.'},
  {id:'bed_no_window',cat:'WC/Ngủ',label:'Phòng ngủ không cửa sổ',impact:'Thiếu khí dương.',remedy:'Thông gió cưỡng bức, giếng trời, lọc khí.'},

  // Bàn thờ
  {id:'altar_back_wc',cat:'Bàn thờ',label:'Bàn thờ tựa/giáp WC',impact:'Uế sát, bất kính.',remedy:'Cách tường kỹ thuật, dời vị trí.'},
  {id:'altar_under_stair',cat:'Bàn thờ',label:'Bàn thờ dưới cầu thang',impact:'Động sát.',remedy:'Di dời vị trí tĩnh.'},
  {id:'altar_face_kitchen',cat:'Bàn thờ',label:'Bàn thờ đối bếp',impact:'Hỏa xung tĩnh.',remedy:'Bình phong, đổi hướng; ưu tiên hướng hợp mệnh.'},
  {id:'altar_face_door',cat:'Bàn thờ',label:'Bàn thờ chiếu thẳng cửa',impact:'Khí động.',remedy:'Bình phong, rèm; lùi chiến lược.'},

  // Khác
  {id:'aquarium_wrong',cat:'Khác',label:'Bể cá đặt sai cung',impact:'Thủy sai vị trí gây hao.',remedy:'Đặt tại cung hợp mệnh hoặc Sinh Khí/Diên Niên.'},
  {id:'tank_over_bed',cat:'Khác',label:'Bồn nước trên phòng ngủ',impact:'Áp Thủy, ẩm ồn.',remedy:'Di dời hoặc chống rung/ồn.'},
  {id:'color_conflict',cat:'Khác',label:'Màu nội thất khắc mệnh',impact:'Khí nghịch.',remedy:'Chọn bảng màu tương sinh/tương hòa.'},
  {id:'stair_steps',cat:'Khác',label:'Bậc thang rơi “Bệnh/Tử”',impact:'Bất an.',remedy:'Tính lại bậc theo Sinh-Lão-Bệnh-Tử (kết bậc vào Sinh/Lão).'},
  {id:'roof_glare',cat:'Khác',label:'Mái/biển quảng cáo phản quang',impact:'Quang sát.',remedy:'Rèm/lam che, cây tán.'},
  {id:'karaoke',cat:'Khác',label:'Gần bar/karaoke',impact:'Ồn, khí tạp.',remedy:'Cách âm mạnh, lớp cửa kép, cây/vách đệm.'},
  {id:'garbage',cat:'Khác',label:'Gần điểm rác/mùi hôi',impact:'Uế khí.',remedy:'Cách ly, khử mùi, đổi hướng cửa.'}
];
function renderIssues(filter=''){
  const wrap=document.getElementById('issues-container'); if(!wrap) return;
  const f=(filter||'').toLowerCase();
  const list=ISSUES.filter(i=> (i.cat+' '+i.label).toLowerCase().includes(f) );
  wrap.innerHTML=list.map(i=>`<label class="issue-item"><input type="checkbox" name="issue" value="${i.id}"><span><strong>[${i.cat}]</strong> ${i.label}</span></label>`).join('');
}
function getSelectedIssues(){ return Array.from(document.querySelectorAll('input[name="issue"]:checked')).map(el=>el.value); }
function checkSiteIssues(issueIds){
  const problems=[],solutions=[];
  const map=new Map(ISSUES.map(i=>[i.id,i]));
  issueIds.forEach(id=>{ const it=map.get(id); if(it){ problems.push(`${it.label}: ${it.impact}`); solutions.push(`Hóa giải: ${it.remedy}`); }});
  return {problems,solutions};
}

/* =================== La bàn số =================== */
let compassActive=false, orientationHandler=null;
const degNormalize=x=>{x=x%360; return x<0?x+360:x;};
function degreeToDirection(deg){
  const d=degNormalize(deg);
  if(d>=337.5||d<22.5) return 'Bắc';
  if(d<67.5) return 'Đông Bắc';
  if(d<112.5) return 'Đông';
  if(d<157.5) return 'Đông Nam';
  if(d<202.5) return 'Nam';
  if(d<247.5) return 'Tây Nam';
  if(d<292.5) return 'Tây';
  return 'Tây Bắc';
}
function updateCompassUI(deg){
  const offset=parseFloat(document.getElementById('compass-offset').value||'0')||0;
  const showDeg=degNormalize(deg+offset);
  document.getElementById('compass-deg').textContent=showDeg.toFixed(0);
  document.getElementById('compass-dir').textContent=degreeToDirection(showDeg);
  document.getElementById('needle').style.transform=`translate(-50%,-100%) rotate(${showDeg}deg)`;
}
async function startCompass(){
  const status=document.getElementById('compass-status');
  try{
    if(!('DeviceOrientationEvent' in window)){ status.textContent='Thiết bị không hỗ trợ la bàn.'; return; }
    if(typeof DeviceOrientationEvent.requestPermission==='function'){
      const perm=await DeviceOrientationEvent.requestPermission();
      if(perm!=='granted'){ status.textContent='Chưa được cấp quyền cảm biến.'; return; }
    }
    orientationHandler=e=>{
      let heading=null;
      if(typeof e.webkitCompassHeading==='number'&&!isNaN(e.webkitCompassHeading)){
        heading=e.webkitCompassHeading; // iOS: 0=Bắc, CW
      }else if(typeof e.alpha==='number'){
        heading=360 - e.alpha; // quy về 0=Bắc
      }
      if(heading!=null) updateCompassUI(heading);
    };
    window.addEventListener('deviceorientation',orientationHandler,true);
    compassActive=true; status.textContent='Đang đo… giữ máy song song mặt đất & lắc hình số 8 để hiệu chuẩn.';
  }catch(err){ status.textContent='Lỗi la bàn: '+(err.message||err); }
}
function stopCompass(){
  if(orientationHandler){ window.removeEventListener('deviceorientation',orientationHandler,true); orientationHandler=null; }
  compassActive=false; document.getElementById('compass-status').textContent='Đã dừng.';
}
function applyCompassToDirection(){
  const deg=parseFloat(document.getElementById('compass-deg').textContent);
  if(isNaN(deg)) return alert('Chưa có dữ liệu la bàn.');
  document.getElementById('huong-nha').value=degreeToDirection(deg);
  alert('Đã gán hướng nhà = '+degreeToDirection(deg));
}

/* =================== Thu thập / Lưu / Hiển thị =================== */
function currentWardValue(){ const v=document.getElementById('bd-ward').value; if(v==='__other__') return document.getElementById('bd-ward-custom').value.trim(); return v; }
function composeFullAddress(){
  const district=document.getElementById('bd-district').value;
  const ward=currentWardValue();
  const detail=document.getElementById('bd-address-detail').value.trim();
  const parts=[]; if(detail)parts.push(detail); if(ward)parts.push(ward); if(district)parts.push(district); parts.push('Đồng Nai'); return parts.join(', ');
}
function gatherInputs(){
  const name=document.getElementById('kh-ten').value.trim();
  const phone=document.getElementById('kh-phone').value.trim();
  const birth=document.getElementById('ngay-sinh').value.trim();
  const gender=document.getElementById('gioi-tinh').value;
  const huong=document.getElementById('huong-nha').value;
  const yearX=parseInt(document.getElementById('nam-xay').value,10);
  const monthX=parseInt(document.getElementById('thang-xay').value,10);

  const district=document.getElementById('bd-district').value;
  const ward=currentWardValue();
  const to=document.getElementById('bd-to').value.trim();
  const thua=document.getElementById('bd-thua').value.trim();
  const price=parseFloat(document.getElementById('bd-price').value)||0;
  const detail=document.getElementById('bd-address-detail').value.trim();
  const note=document.getElementById('bd-note').value.trim();
  const issueIds=getSelectedIssues();

  const fullAddr=composeFullAddress();
  document.getElementById('bd-full-address').textContent=fullAddr||'—';

  const bds={province:'Đồng Nai',district,ward,to,thua,addressDetail:detail,fullAddress:fullAddr,price,note};
  return {name,phone,birth,gender,huong,yearX,monthX,bds,issueIds};
}
function renderResult(R,inputs){
  const dir=analyzeHouseDirection(R.cung.cung,inputs.huong);
  const site=checkSiteIssues(inputs.issueIds);
  let html='';
  html+=`<div class="ket-luan"><div><span class="badge">Cung mệnh</span> <strong>${R.cung.cung}</strong> — Ngũ hành: <strong>${R.cung.nguyenTo}</strong> — Nhóm: <strong>${R.cung.nhomTrach}</strong></div></div>`;
  html+=`<h3 class="block-title">Hướng nhà: ${inputs.huong} <span class="tag ${dir.selected?.loai||'warn'}">${dir.selected?.ten||'—'}</span></h3>`;
  if(dir.selected){ html+=`<p><em>Ý nghĩa:</em> ${dir.selected.y}</p>`; const adv=(dir.selected.loai==='good'?[ 'Ưu tiên dùng cửa/ban công hướng này.','Bếp/giường/bàn thờ/bàn làm việc xoay về 1 trong 4 hướng tốt.','Giữ lối vào thông thoáng.' ]:[ 'Bình phong/hiên/bậc tam cấp để “bẻ” dòng khí xấu.','Bố trí “tọa hung – hướng cát”.','Cân nhắc Bát Quái lồi.','Tăng cây xanh/ánh sáng.' ]); html+=`<ul class="clean">`+adv.map(a=>`<li>${a}</li>`).join('')+`</ul>`; }
  if(dir.goods.length){ const pr={'Sinh Khí':1,'Thiên Y':2,'Diên Niên':3,'Phục Vị':4}; const g=[...dir.goods].sort((a,b)=>(pr[a.ten]||9)-(pr[b.ten]||9)); html+=`<p><strong>4 hướng tốt nên ưu tiên:</strong></p><ul class="clean">`+g.map(x=>`<li><span class="good">${x.huong}</span> — ${x.ten}: ${x.y}</li>`).join('')+`</ul>`; }

  html+=`<hr/><h3 class="block-title">Năm/Tháng xây</h3>`;
  html+=`<p>Tuổi mụ: <strong>${R.ageMu}</strong> — Ngũ hành năm: <strong>${R.yearElement}</strong>${R.monthElement?` — Ngũ hành tháng: <strong>${R.monthElement}</strong>`:''}</p>`;
  if(R.warnings.length===0) html+=`<p class="good">Năm ${inputs.yearX}: Không thấy cảnh báo lớn.</p>`; else html+=`<ul class="clean">`+R.warnings.map(w=>`<li class="bad">${w}</li>`).join('')+`</ul>`;
  if(R.monthWarnings.length===0) html+=`<p class="good">Tháng ${inputs.monthX}: Không thấy cảnh báo lớn.</p>`; else html+=`<ul class="clean">`+R.monthWarnings.map(w=>`<li class="warn">${w}</li>`).join('')+`</ul>`;

  html+=`<hr/><h3 class="block-title">Môi trường & lỗi phong thủy</h3>`;
  if(site.problems.length===0) html+=`<p class="good">Không phát hiện lỗi đã chọn.</p>`;
  else{ html+=`<p><strong>Vấn đề:</strong></p><ul class="clean">`+site.problems.map(p=>`<li class="bad">${p}</li>`).join('')+`</ul>`;
        html+=`<p><strong>Hóa giải:</strong></p><ul class="clean">`+site.solutions.map(s=>`<li>${s}</li>`).join('')+`</ul>`; }

  html+=`<hr/><h3 class="block-title">Thông tin bất động sản</h3>`;
  html+=`<p><strong>Địa chỉ:</strong> ${inputs.bds.fullAddress||'—'}</p>`;
  html+=`<p><strong>Tờ/Thửa:</strong> ${inputs.bds.to||'—'} / ${inputs.bds.thua||'—'}</p>`;
  html+=`<p><strong>Giá:</strong> ${inputs.bds.price?new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(inputs.bds.price):'—'}</p>`;
  html+=`<p><strong>Ghi chú:</strong> ${inputs.bds.note||'—'}</p>`;
  document.getElementById('result-content').innerHTML=html;
}

/* =================== Lưu hồ sơ =================== */
function saveProfile(currentResult){
  const i=gatherInputs();
  if(!i.name) return alert('Vui lòng nhập họ tên.');
  if(!i.phone) return alert('Vui lòng nhập SĐT.');
  if(!isValidPhone(i.phone)) return alert('SĐT chưa đúng định dạng.');
  if(!i.birth) return alert('Vui lòng nhập ngày sinh.');
  if(!i.yearX||i.yearX<1900||i.yearX>2099) return alert('Năm xây không hợp lệ.');
  if(!i.monthX||i.monthX<1||i.monthX>12) return alert('Tháng xây không hợp lệ.');
  const R=currentResult||evaluateBuildTime(i.birth,i.gender,i.yearX,i.monthX);
  const list=getProfiles(); const phoneKey=normalizePhone(i.phone); const idx=list.findIndex(p=>p.customer.phoneKey===phoneKey);
  const profile={ id:idx>=0?list[idx].id:uuid(), createdAt:idx>=0?list[idx].createdAt:new Date().toISOString(), updatedAt:new Date().toISOString(),
    customer:{name:i.name,phone:i.phone,phoneKey},
    input:{birth:i.birth,gender:i.gender,huong:i.huong,year:i.yearX,month:i.monthX,issueIds:i.issueIds},
    bds:i.bds, result:R,
    summary:{cung:R.cung.cung,menh:R.cung.nguyenTo,nhom:R.cung.nhomTrach,dir:i.huong,fullAddress:i.bds.fullAddress,to:i.bds.to,thua:i.bds.thua,price:i.bds.price,issues:i.issueIds.length}
  };
  if(idx>=0) list[idx]=profile; else list.unshift(profile);
  setProfiles(list); renderProfiles(); alert('Đã lưu hồ sơ.');
}
function renderProfiles(filter=''){
  const tbody=document.getElementById('profiles-tbody');
  const list=getProfiles().filter(p=> (p.customer.name+' '+p.customer.phone).toLowerCase().includes((filter||'').toLowerCase()) );
  const fmt=s=>new Date(s).toLocaleString();
  tbody.innerHTML=list.map(p=>`
    <tr data-id="${p.id}">
      <td>${p.customer.name}</td>
      <td>${p.customer.phone}</td>
      <td>${p.summary.cung} (${p.summary.menh})</td>
      <td>${p.summary.dir}</td>
      <td>${p.summary.fullAddress||''}</td>
      <td>${(p.summary.to||'')}${p.summary.thua?(' / '+p.summary.thua):''}</td>
      <td>${p.summary.price?new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(p.summary.price):''}</td>
      <td>${p.summary.issues||0}</td>
      <td>${fmt(p.createdAt)}</td>
      <td class="row-actions"><button class="view">Xem</button><button class="delete">Xóa</button></td>
    </tr>`).join('');
}
function exportCSV(){
  const rows=getProfiles(); if(rows.length===0) return alert('Chưa có dữ liệu để xuất.');
  const header=['id','name','phone','birth','gender','huong','year','month','cung','menh','nhom','address','ward','district','to','thua','price','issues','note','createdAt'];
  const csv=[header.join(',')];
  rows.forEach(p=>{
    const b=p.bds||{};
    const r=[p.id,`"${(p.customer.name||'').replace(/"/g,'""')}"`,p.customer.phone,p.input.birth,p.input.gender,p.input.huong,p.input.year,p.input.month,
      p.result?.cung?.cung||'',p.result?.cung?.nguyenTo||'',p.result?.cung?.nhomTrach||'',
      b.fullAddress||'',b.ward||'',b.district||'',b.to||'',b.thua||'',b.price||'',(p.input.issueIds||[]).length,(b.note||'').replace(/,/g,';'),p.createdAt];
    csv.push(r.join(','));
  });
  const blob=new Blob([csv.join('\n')],{type:'text/csv;charset=utf-8;'}); const url=URL.createObjectURL(blob);
  const a=document.createElement('a'); a.href=url; a.download='ho_so_khach_bds.csv'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

/* =================== Sự kiện UI =================== */
document.addEventListener('DOMContentLoaded', ()=>{
  // District/Ward
  populateDistricts(); populateWards(document.getElementById('bd-district').value);
  document.getElementById('bd-district').addEventListener('change',e=>{ populateWards(e.target.value); document.getElementById('bd-full-address').textContent=composeFullAddress(); });
  document.getElementById('bd-ward').addEventListener('change',e=>{ toggleWardCustom(e.target.value==='__other__'); document.getElementById('bd-full-address').textContent=composeFullAddress(); });
  document.getElementById('bd-ward-custom').addEventListener('input',()=>{ document.getElementById('bd-full-address').textContent=composeFullAddress(); });
  document.getElementById('btn-save-ward').addEventListener('click',()=>{ const d=document.getElementById('bd-district').value; const w=document.getElementById('bd-ward-custom').value.trim(); if(!w) return alert('Nhập tên phường/xã.'); saveUserAddedWard(d,w); populateWards(d); document.getElementById('bd-ward').value=w; toggleWardCustom(false); alert('Đã lưu phường vào danh sách.'); });

  // Issues
  renderIssues(); document.getElementById('issues-search').addEventListener('input',e=>renderIssues(e.target.value));

  // Compass
  document.getElementById('btn-compass-start').addEventListener('click',startCompass);
  document.getElementById('btn-compass-stop').addEventListener('click',stopCompass);
  document.getElementById('btn-compass-apply').addEventListener('click',applyCompassToDirection);

  // Profiles
  renderProfiles();
  document.getElementById('profiles-search').addEventListener('input',e=>renderProfiles(e.target.value));

  // Analyze
  document.getElementById('btn-analyze').addEventListener('click',()=>{
    try{
      const i=gatherInputs();
      if(!i.birth) return alert('Vui lòng nhập ngày sinh.');
      if(!i.yearX||i.yearX<1900||i.yearX>2099) return alert('Năm xây không hợp lệ.');
      if(!i.monthX||i.monthX<1||i.monthX>12) return alert('Tháng xây không hợp lệ.');
      const R=evaluateBuildTime(i.birth,i.gender,i.yearX,i.monthX);
      renderResult(R,i);
    }catch(err){ alert('Lỗi: '+(err.message||err)); }
  });

  // Save / Export
  document.getElementById('btn-save').addEventListener('click',()=>{ try{ saveProfile(); }catch(err){ alert('Lỗi: '+(err.message||err)); }});
  document.getElementById('btn-export').addEventListener('click',exportCSV);

  // Row actions
  document.getElementById('profiles-tbody').addEventListener('click',e=>{
    const tr=e.target.closest('tr'); if(!tr) return; const id=tr.getAttribute('data-id');
    const list=getProfiles(); const p=list.find(x=>x.id===id); if(!p) return;
    if(e.target.classList.contains('view')){
      document.getElementById('kh-ten').value=p.customer.name;
      document.getElementById('kh-phone').value=p.customer.phone;
      document.getElementById('ngay-sinh').value=p.input.birth;
      document.getElementById('gioi-tinh').value=p.input.gender;
      document.getElementById('huong-nha').value=p.input.huong;
      document.getElementById('nam-xay').value=p.input.year;
      document.getElementById('thang-xay').value=p.input.month;

      document.getElementById('bd-district').value=p.bds.district; populateWards(p.bds.district);
      if(getWardOptionsForDistrict(p.bds.district).includes(p.bds.ward)){ document.getElementById('bd-ward').value=p.bds.ward; toggleWardCustom(false); }
      else { document.getElementById('bd-ward').value='__other__'; toggleWardCustom(true); document.getElementById('bd-ward-custom').value=p.bds.ward||''; }
      document.getElementById('bd-to').value=p.bds.to||'';
      document.getElementById('bd-thua').value=p.bds.thua||'';
      document.getElementById('bd-address-detail').value=p.bds.addressDetail||'';
      document.getElementById('bd-price').value=p.bds.price||'';
      document.getElementById('bd-note').value=p.bds.note||'';
      document.getElementById('bd-full-address').textContent=p.bds.fullAddress||'—';

      // tick lại issues
      renderIssues(document.getElementById('issues-search').value||'');
      const set=new Set(p.input.issueIds||[]);
      document.querySelectorAll('input[name="issue"]').forEach(cb=> cb.checked=set.has(cb.value));

      renderResult(p.result,{...p.input,bds:p.bds,issueIds:p.input.issueIds||[]});
      window.scrollTo({top:0,behavior:'smooth'});
    }
    if(e.target.classList.contains('delete')){
      if(confirm('Xóa hồ sơ này?')){ setProfiles(list.filter(x=>x.id!==id)); renderProfiles(document.getElementById('profiles-search').value); }
    }
  });
});
let desiredDepartment = '';
let position = '';
let reason = '';
let days = '';
let curDate = new Date().toLocaleDateString('ru-RU');
let curYear = new Date().getFullYear();

//Всплывающие окна
document.querySelectorAll('input[name="type"]').forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
      if (this.checked) {
          switch (this.value) {
              case 'отпуск оплачиваемый':
                  reason = prompt("Укажите обстоятельства отпуска:", "в связи с ");
                  days = prompt("Укажите на сколько дней планируется отпуск:");
                  break;
              case 'отпуск за свой счёт':
                  reason = prompt("Укажите обстоятельства отпуска:", "в связи с ");
                  days = prompt("Укажите на сколько дней планируется отпуск:");
                  break;
              case 'декретный отпуск':
                  days = prompt("Укажите на сколько дней планируется отпуск:\n В случае многоплодной беременности - 84 дня\n В случае осложненных родов - 86 дней\n При рождении двух или более детей - 110 дней\n В остальных случаях 70 дней",70);
                  break;
              case 'увольнение':
                  break;
              case 'перевод по должности':
                  position = prompt("Укажите желаемую должность:")
                  break;
              case 'перевод по отделу':
                  desiredDepartment = prompt("Укажите желаемый отдел:")
                  break;
              default:
                  break;
          }
      } else {
      }
  });
});

// Функция определения инициалов имени
function getInitials(name, patronymic) {
  let initials = name.charAt(0) + '.';
  if (patronymic) {
    initials += patronymic.charAt(0) + '.';
  }
  return initials;
}
//Переменные которые используються в форме
document.getElementById('generate-pdf').addEventListener('click', function() {
  let chiefName = "Иванову И.И.";
  let employeeName = document.getElementById('surname').value;
  let employeePatronymic = document.getElementById('patronymic').value;

  let surname = document.getElementById('surname').value;
  let name = document.getElementById('name').value;
  let patronymic = document.getElementById('patronymic').value;
  let post = document.getElementById('post').value;
  let department = document.getElementById('department').value;
  let employeeInitials = getInitials(employeeName, employeePatronymic);
  let selectedType = getSelectedTypes() || 'Тип не выбран';

  let textContent = ''

  switch (selectedType) {
    case 'отпуск оплачиваемый':
      textContent = `Прошу отправить меня ${reason}, в ежегодный оплачиваемый отпуск на ${days} дня/ей.`;
      break;
    case 'отпуск за свой счёт':
      textContent = `Прошу отправить меня ${reason}, в отпуск за свой счёт на ${days} дня/ей.`;
      break;
    case 'декретный отпуск':
      textContent = `Прошу предоставить мне отпуск по беременности и родам за на ${days} дня/ей и выплатить пособие по беремености и родам, а также единовременное пособие на основании ранней постановки на учет в женской консультации.`;
      break;
    case 'увольнение':
      textContent = `Прошу уволить меня по собственному желанию ${curDate} и выдать мне копии приказов о приёме, переводах и увольнении, относящихся к моей работе в Иркутском Аэропорте, а так же справку о доходах физического лица за ${curYear} (по форме № 2-НДФЛ).`;
      break;
    case 'перевод по должности':
      textContent = `Прошу перевести меня с должности ${post} на должность ${position} c ${curDate}.`;
      break;
    case 'перевод по отделу':
      textContent = `Прошу перевести меня с отдела ${department} в отдел ${desiredDepartment} c ${curDate}. С условаиями работы ознокомлен/на, согласен/на` ;
      break;
    default:
      break;
  }
//Форма заявления
let docDefinition = {
  pageSize:'A4',
  content: [
    {
      lineHeight: 1.5, // optional
      text: [
        { text: 'Начальнику ', bold: true, alignment: 'right' },
        { text: chiefName + '\n', alignment: 'right' },
        { text: 'от сотрудника: ', bold: true, alignment: 'right' },
        { text: document.getElementById('department').value + '\n', alignment: 'right' },
        { text: `${surname} ${name} ${patronymic}` + '\n', alignment: 'right' },
        { text: 'проживающего по адресу: ' + '\n', bold: true, alignment: 'right' },
        { text: document.getElementById('adress').value + '\n', alignment: 'right' },
        { text: 'Номер телефона: ', bold: true, alignment: 'right' },
        { text: document.getElementById('phone').value + '\n', alignment: 'right' },
        { text: 'Почта: ', bold: true, alignment: 'right' },
        { text: document.getElementById('mail').value + '\n\n\n\n\n', alignment: 'right' },
        { text: 'Заявление', bold: true, alignment: 'center', fontSize: 20 },
        { text: '\n\n\n\n' + textContent, alignment: 'justify', margin: [20, 0, 0, 0] },'\n\n\n',
        { text: 'Подпись _________', alignment: 'right' },'\n\n\n',
        { text: '' + curDate, alignment: 'right',},'\n',
      ]
    }
  ]
};
  console.log(docDefinition)
  pdfMake.createPdf(docDefinition).download(`Завявление_от_${surname}_${name}_${patronymic}.pdf`);
});
//Галочка чекбокс
function getSelectedTypes() {
  let typeCheckboxes = document.querySelectorAll('input[name="type"]:checked');
  return typeCheckboxes.length > 0 ? typeCheckboxes[0].value : null; // Добавлена проверка на наличие выбранного элемента
}


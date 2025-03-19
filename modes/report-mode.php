<div class="report-form-wrapper">
  <form id="report-form">
    <fieldset id="report-fieldset">
      <div class="form-element">
        <label for="grouping">Группировка</label>
        <select name="grouping" id="grouping">
          <option value="" selected>Не группировать</option>
          <option value="Книги.Название">По книгам</option>
          <option value="Дата_выдачи">По дате выдачи</option>
          <option value="Фамилия">По фамилиям читателей</option>
          <option value="Число_дней">По числу дней у читателя</option>
        </select>
      </div>
      <div class="form-element">
        <label for="sorting">Сортировка</label>
        <select name="sorting">
          <option value="" selected>Не сортировать</option>
          <option value="Название">По книгам</option>
          <option value="Дата_выдачи">По дате выдачи</option>
          <option value="Фамилия">По фамилиям читателей</option>
          <option value="Число_дней">По числу дней у читателя</option>
        </select>
      </div>
      <div class="form-element"><label for="sorting-order">Порядок сортировки</label>
        <select name="sorting-order">
          <option value="ASC">По возрастанию</option>
          <option value="DESC">По убыванию</option>
        </select>
      </div>
      <div class="form-element">
        <input type="submit" value="Создать отчет">
      </div>
    </fieldset>
  </form>
  <button id="print-button">Вывести отчет на печать</button>
  <div id="report-node"></div>
</div>

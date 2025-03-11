CREATE DATABASE Библиотека CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE Библиотека

CREATE TABLE Авторы (
  Код_автора INT NOT NULL,
  Имя VARCHAR(100),
  Фамилия VARCHAR(100),
  Дата_рождения DATE,
  Дата_смерти DATE,

  PRIMARY KEY (Код_автора)
);

CREATE TABLE Издательства (
  Код_издательства INT NOT NULL,
  Название VARCHAR(100),
  Адрес VARCHAR(100),
  Год_основания INT,

  PRIMARY KEY (Код_издательства)
);

CREATE TABLE Жанры (
  Код_жанра INT NOT NULL,
  Название VARCHAR(100),
  Описание TEXT,
  Рейтинг FLOAT,

  PRIMARY KEY (Код_жанра)
);

CREATE TABLE Читатели (
  Код_читателя INT NOT NULL,
  Имя VARCHAR(100),
  Фамилия VARCHAR(100),
  Дата_рождения DATE,
  Телефон VARCHAR(20),

  PRIMARY KEY (Код_читателя)
);

CREATE TABLE Книги (
  Код_книги INT NOT NULL,
  Название VARCHAR(100) NOT NULL,
  Год_первой_публикации INT,
  Код_издательства INT,

  PRIMARY KEY (Код_книги),
  FOREIGN KEY (Код_издательства) REFERENCES Издательства(Код_издательства) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Причины_утерь_экземпляров (
  Код_причины_утери INT NOT NULL,
  Название VARCHAR(100),
  Описание TEXT,

  PRIMARY KEY (Код_причины_утери)
);

CREATE TABLE Экземпляры (
  Код_экземпляра INT NOT NULL,
  Код_книги INT NOT NULL,
  Дата_поступления DATE,
  Дата_утери DATE,
  Код_причины_утери INT,

  FOREIGN KEY (Код_книги) REFERENCES Книги(Код_книги) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (Код_причины_утери) REFERENCES Причины_утерь_экземпляров(Код_причины_утери) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (Код_экземпляра)
);

CREATE TABLE Хранилище_экземпляров (
  Код_архива INT NOT NULL,
  Номер_стеллажа INT NOT NULL,
  Номер_полки INT NOT NULL,
  Тип_хранилища ENUM('Открытый доступ', 'Закрытый фонд'),

  PRIMARY KEY (Код_архива, Номер_стеллажа)
);

CREATE TABLE Книги_и_авторы (
  Код_книги INT NOT NULL,
  Код_автора INT NOT NULL,

  FOREIGN KEY (Код_книги) REFERENCES Книги(Код_книги) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (Код_автора) REFERENCES Авторы(Код_автора) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (Код_книги, Код_автора)
);

CREATE TABLE Книги_и_жанры (
  Код_жанра INT NOT NULL,
  Код_книги INT NOT NULL,

  FOREIGN KEY (Код_жанра) REFERENCES Жанры(Код_жанра) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (Код_книги) REFERENCES Книги(Код_книги) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (Код_жанра, Код_книги)
);

CREATE TABLE Книговыдачи (
  Код_выдачи INT NOT NULL,
  Код_экземпляра INT NOT NULL,
  Код_читателя INT,
  Дата_выдачи DATE,
  Дата_сдачи DATE,

  FOREIGN KEY (Код_экземпляра) REFERENCES Экземпляры(Код_экземпляра) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (Код_читателя) REFERENCES Читатели(Код_читателя) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (Код_выдачи)
);

CREATE TABLE Штрафы (
  Код_штрафа INT NOT NULL,
  Статус ENUM('Оплачен', 'Не оплачен'),
  Сумма FLOAT NOT NULL,
  Код_выдачи INT NOT NULL,

  FOREIGN KEY (Код_выдачи) REFERENCES Книговыдачи(Код_выдачи) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (Код_выдачи)
);

INSERT INTO Авторы (Код_автора, Имя, Фамилия, Дата_рождения, Дата_смерти)
VALUES (1, 'Федор', 'Достоевский', '1821-11-12', '1881-02-09'),
       (2, 'Лев', 'Толстой', '1828-09-09', '1910-11-20'),
       (3, 'Франц', 'Кафка', '1883-07-03', '1924-06-03'),
       (4, 'Джоан', 'Роулинг', '1965-07-31', NULL),
       (5, 'Уильям', 'Шекспир', NULL, '1616-04-23'),
       (6, 'Николай', 'Гоголь', '1809-04-01', '1852-03-04'),
       (7, 'Дэвид', 'Сэлинджер', '1919-01-01', '2010-01-27'),
       (8, 'Рэй', 'Брэдбери', '1920-08-22', '2012-06-05'),
       (9, 'Стивен', 'Кинг', '1947-09-21', NULL),
       (10, 'Джейн', 'Остин', '1775-12-16', '1817-07-18'),
       (11, 'Рене', 'Декарт', '1596-03-31', '1650-02-11'),
       (12, 'Евгений', 'Замятин', '1884-02-01', '1937-03-10'),
       (13, 'Оскар', 'Уайлд', '1854-10-16', '1900-11-30'),
       (14, 'Иммануил', 'Кант', '1724-04-22', '1804-02-28');

INSERT INTO Издательства (Код_издательства, Название, Адрес, Год_основания)
VALUES (1, 'Азбука',
       'город Москва, Партийный пер, д. 1 к. 25', 1994),
       (2, 'АСТ', 'город Москва, Партийный пер, д. 1 к. 25', 1990),
       (3, 'Эксмо', 'город Москва, Улица Зорге, д. 1.', 1991),
       (4, 'Питер', 'Санкт-Петербург, Б.Сампсониевский пр., 29а', 1991),
       (5, 'АСТРЕЛЬ-СПБ', 'Петроградский район, БЦ "Сенатор", Чапаева, 15, Санкт-Петербург, Россия', 2003),
       (6, 'Махаон', 'г. Санкт-Петербург, ул. Решетникова, д. 15', 1993),
       (7, 'Центр книги Рудомино', 'Россия, Москва, Николямская улица 1', 2007);

INSERT INTO Жанры (Код_жанра, Название, Описание, Рейтинг)
VALUES (1, 'Драма', 'Жанр литературы, повествующий о серьезных, иногда печальных событиях, но не заканчивающийся трагическим финалом. Драму по
   определению относят к серьезным жанрам литературы. В отличие от легкой литературы драма сосредоточена не на сюжете, а на переживаниях героев в
    обстоятельствах, предложенных сюжетом.', 10),
       (2, 'Комедия', 'Художественное произведение с юмористическим сюжетом, противоположность трагедии. Термин «комедия» состоит из двух 
         греческих слов: komos, что переводится как «веселое шествие» или «праздник в честь Диониса», и «ode» — «песня». Появился этот термин в VI 
        веке до нашей эры в Древней Греции.', 4),
       (3, 'Ужасы', 'Жанр художественного произведения, который предназначен устрашить, напугать, шокировать или вызвать отвращение у своих читателей 
        или зрителей, вызвав у них чувства ужаса и шока', 7),
       (4, 'Романтика', 'Идейное и художественное направление в европейской и американской культуре конца XVIII века — первой половины XIX века, 
        характеризуется утверждением самоценности духовно-творческой жизни личности, изображением сильных (зачастую бунтарских) страстей и характеров, 
        одухотворённой и целительной природы.', 8),
       (5, 'Реализм', 'Литературное направление, а также художественный метод в литературе, цель которого заключается в правдивом, реалистичном 
        и достоверном отображении действительности в литературном произведении.', 6),
       (6, 'Приключения', 'жанр романа, сформировавшийся в середине XIX века на волне романтизма и неоромантизма с характерным для них стремлением 
        бежать от мещанской повседневности в мир экзотики и героизма.', 5),
       (7, 'Трагедия', 'драматургический жанр, в котором изображается конфликт мировоззрений, острое и непримиримое противоречие, приводящее 
        к катастрофическим последствиям. Трагедия всегда заканчивается гибелью главного героя, а иногда и других действующих лиц.', 9),
       (8, 'Поэзия', 'Искусство выразительного слова, являющееся творчеством словесной красоты. Стихи, мелодичная речь (в отличие от литературной прозы).', 10),
       (9, 'Научная фантастика', 'жанр литературы, в котором вымыслы и фантастические допущения искусно смешивают реальную науку и выдуманный автором 
        мир. Это один из самых требовательных в работе жанров — потому что приходится иметь дело с научной стороной жизни человечества. Здесь важно 
        не только создать увлекательный сюжет и запоминающихся персонажей, но и достоверно изобразить вымышленный мир, чтобы он выглядел реалистично 
        и логично.', 7),
       (10, 'Фэнтези', 'Жанр спекулятивной фантастики, который затрагивает темы сверхъестественного, магического и воображаемого миров и существ.', 8),
       (11, 'Антиутопия', 'Жанр литературы, в котором описывается безрадостное будущее человечества. Другими словами, мир, где всё плохо. В нём 
        страдает и экология, и простые люди, царит диктатура, почти всегда идут войны или случаются катастрофы.', 7),
       (12, 'Историческая проза', 'условное обозначение для разнородных по структуре и композиции романов, повестей, рассказов, в которых 
        повествуется об исторических событиях более или менее отдалённого времени, а действующими лицами (главными или второстепенными) 
        могут выступать исторические личности.', 4),
       (13, 'Философия', 'особая форма познания и система знаний об общих характеристиках, понятиях и принципах действительности (бытия), 
        а также о бытии человека и об отношении его и окружающего его мира', 10),
       (14, 'Готическая литература', 'Это произведения, основанные на приятном, эстетизированом ощущении ужаса читателя, романтический 
        «чёрный роман» в прозе с элементами сверхъестественных «ужасов», таинственных приключений, фантастики и мистики 
        (семейные проклятия и привидения). Развивался в основном в англоязычной литературе.', 3),
       (15, 'Нон-фикшн', 'Произведения категории нон-фикшн основаны не на вымысле, а на фактах. В связи с этим в категорию нон-фикшн попадает 
        широкий спектр книжной продукции, включая кулинарные книги, мемуары, эссе, энциклопедии и словари, научно-популярную литературу, 
         книги по психологии и личностному росту, философию и многое другое.', 5),
       (16, 'Эпопея', 'роман, сюжет которого охватывает масштабные исторические события. Задача романа-эпопеи не только показать трансформацию 
        героя в определенных обстоятельствах, но и дать масштабную картину определенного исторического события, целой эпохи или переломного момента 
        в судьбе нации.', 8),
       (17, 'Подростковая литература', 'Особенностями литературы для подростков являются многоплановый сюжет, создание напряжённости 
        вместо использования шокового эффекта, яркие персонажи, точная и детальная передача фактов, аутентичные диалоги, понятный стиль изложения, 
        чувство юмора, интригующее вступление и запоминающаяся концовка.', 10);

INSERT INTO Книги (Код_книги, Название, Год_первой_публикации, Код_издательства)
VALUES (1, 'Преступление и наказание', 1886, 3),
       (2, 'Война и мир', 1867, 1),
       (3, '451 градус по Фаренгейту', 1953, 2),
       (4, 'Гордость и предубеждение', 1813, 2),
       (5, 'Гарри Поттер и философский камень', 1997, 6),
       (6, 'Портрет Дориана Грея', 1890, 2),
       (7, 'Ромео и Джульетта', 1591, 2),
       (8, 'Письмо отцу', 1919, 7),
       (9, 'Мы', 1924, 2),
       (10, 'Рассуждение о методе', 1637, 2),
       (11, 'Мертвые души', 1842, 3),
       (12, 'Анна Каренина', 1873, 2),
       (13,'Критика чистого разума', 1781, 1),
       (14, 'Над пропастью во ржи', 1951, 3);

INSERT INTO Причины_утерь_экземпляров (Код_причины_утери, Название, Описание)
VALUES (1, 'Утеря читателем', 'Экземпляр был потерян пользователем, который взял его во 
  временное пользование.'), (2, 'Кража', 'Экземпляр был похищен третьими лицами.
'), (3, 'Ошибки в учете', 'Экземпляр считается утерянным из-за неточностей или сбоев в процессе учета и регистрации.'),
       (4, 'Устранение из-за состояния', NULL), (5, 'Потеря по вине сотрудников', NULL),
       (6, 'Вандализм', 'Экземпляр был безвозвратно поврежден в результате преднамеренных разрушительных действий.'), 
       (7, 'Недостаток контроля доступа', 'Экземпляр был утерян из-за отсутствия или недостаточности мер, регулирующих доступ к фондам.');

INSERT INTO Экземпляры (Код_экземпляра, Код_книги, Дата_поступления, Дата_утери, Код_причины_утери)
VALUES (1, 1, '2023-10-10', NULL, NULL),
       (2, 1, '2023-10-10', '2024-02-09', 2),
       (3, 2, '2024-03-16', NULL, NULL),
       (4, 3, '2024-06-01', '2024-08-03', 3),
       (5, 4, '2024-07-03', NULL, NULL),
       (6, 5, '2024-01-24', '2024-02-03', 6),
       (7, 6, '2023-11-12', NULL, NULL),
       (8, 6, '2023-11-12', NULL, NULL),
       (9, 7, '2023-12-01', '2024-04-03', 1),
       (10, 8, '2023-11-11', NULL, NULL),
       (11, 9, '2024-07-14', NULL, NULL),
       (12, 9, '2024-07-14', '2024-09-08', 4),
       (13, 10, '2024-08-13', NULL, NULL),
       (14, 10, '2024-08-13', '2024-10-01', 5),
       (15, 10, '2024-08-13', NULL, NULL),
       (16, 11, '2024-03-03', NULL, NULL),
       (17, 12, '2023-11-28', '2024-09-09', 3),
       (18, 12, '2023-11-18', NULL, NULL),
       (19, 13, '2024-05-06', NULL, NULL),
       (20, 14, '2024-04-08', '2024-10-14', 1),
       (21, 14, '2024-04-08', NULL, NULL);

INSERT INTO Хранилище_экземпляров (Код_архива, Номер_стеллажа, Номер_полки, Тип_хранилища)
VALUES (1, 1, 1, 'Открытый доступ'), (2, 1, 2, 'Открытый доступ'), (5, 1, 3, 'Открытый доступ'), (3, 2, 4, 'Закрытый фонд'), 
(4, 2, 5, 'Открытый доступ'), (6, 2, 6, 'Закрытый фонд'),
       (5, 3, 7, 'Открытый доступ'), (4, 3, 8, 'Открытый доступ'), (2, 3, 9, 'Закрытый фонд'), (5, 4, 10, 'Открытый доступ'), 
       (1, 4, 11, 'Открытый доступ'), (2, 4, 12, 'Открытый доступ'),
       (1, 6, 13, 'Открытый доступ'), (3, 5, 14, 'Закрытый фонд'), (5, 5, 15, 'Закрытый фонд'), (4, 5, 16, 'Открытый доступ'), 
       (2, 5, 17, 'Открытый доступ'), (3, 6, 18, 'Открытый доступ'), (5, 6, 19, 'Открытый доступ'), 
       (4, 6, 20, 'Закрытый фонд'), (6, 6, 21, 'Открытый доступ');

INSERT INTO Книги_и_жанры (Код_книги, Код_жанра)
VALUES (1, 1), (1, 4), (1, 5), (1, 6),
       (2, 1), (2, 9), (3, 10), (3, 11),
       (4, 4), (5, 6), (5, 2), (5, 10),
       (6, 14), (7, 7), (8, 15), (9, 11),
       (10, 13), (11, 8), (11, 16), (11, 17),
       (12, 8), (12, 16), (12, 17), (13, 13),
       (14, 5), (14, 17);

INSERT INTO Книги_и_авторы (Код_книги, Код_автора)
VALUES (1, 1), (2, 2), (3, 8), (4, 10), (5, 4),
       (6, 13), (7, 5), (8, 3), (9, 12), (10, 11),
       (11, 6), (12, 2), (13, 14), (14, 7);

INSERT INTO Читатели (Код_читателя, Имя, Фамилия, Дата_рождения, Телефон)
VALUES (1, 'Родион', 'Раскольников', '1972-06-02', '+7(495)647-5725'),
       (2, 'Настасья', 'Барашкова', '1997-03-08', '+7(495)033-6113'),
       (3, 'Тарас', 'Бульба', '2002-05-01', '+7(495)805-9626'),
       (4, 'Анна', 'Каренина', '2001-01-01', '+7(495)173-0532'),
       (5, 'Михаил', 'Собакевич', '1980-11-16', '+7(495)484-0114'),
       (6, 'Павел', 'Чичиков', '1999-12-23', '+7(495)513-3499'),
       (7, 'Софья', 'Мармеладова', '2003-07-07', '+7(495)222-3357'),
       (8, 'Парфён', 'Рогозин', '1970-04-30', '+7(495)205-8473'),
       (9, 'Аркадий', 'Свидригайлов', '1996-03-27', '+7(495)679-7835'),
       (10, 'Аглая', 'Епанчина', '2000-09-11', '+7(495)497-9864');

INSERT INTO Книговыдачи (Код_выдачи, Код_экземпляра, Код_читателя, Дата_выдачи, Дата_сдачи)
VALUES (1, 2, 1, '2024-09-02', '2024-09-16'),
       (2, 3, 4, '2024-08-13', '2024-09-13'),
       (3, 1, 3, '2024-06-03', '2024-06-15'),
       (4, 5, 2, '2024-08-14', '2024-09-03'),
       (5, 7, 5, '2024-01-05', '2024-03-05'),
       (6, 9, 7, '2024-07-16', '2024-08-17'),
       (7, 11, 9, '2024-08-14', '2024-08-30'),
       (8, 10, 8,'2024-08-11', '2024-09-01'),
       (9, 13, 3, '2024-09-01', '2024-09-15'),
       (10, 14, 4, '2024-08-02', '2024-09-02'),
       (11, 8, 10, '2024-08-04', '2024-09-04'),
       (12, 4, 6, '2024-08-30', '2024-09-13');

INSERT INTO Штрафы (Код_штрафа, Статус, Сумма, Код_выдачи)
VALUES (1, 'Не оплачен', 200, 6), (2, 'Оплачен', 100, 12), (3, 'Оплачен', 50, 8);
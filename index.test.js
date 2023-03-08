const utils = require("./index");

describe("[Görev 1] nesneyiTrimle", () => {
  test("[1] propları trimlenmiş bir nesne döndürüyor", () => {
    // ÖRNEK
    const input = { foo: "  foo ", bar: "bar ", baz: " baz" };
    const expected = { foo: "foo", bar: "bar", baz: "baz" };
    const actual = utils.nesneyiTrimle(input);
    expect(actual).toEqual(expected);
  });
});

describe("[Görev 2] verileniTrimle", () => {
  test("[3] verilen propu trimliyor", () => {
    const input = { isim: "  jane  ", yas: " 34 " };
    const expected = { isim: "jane", yas: " 34 " };
    const prop = "isim";
    const actual = utils.verileniTrimle(input, prop);
    expect(actual).toEqual(expected);
  });
  test("[4] verilen dışındaki proplar trimlenmeden döndürülüyor", () => {
    const input = { isim: "  jane  ", yas: " 34 ", role: " admin   " };
    const expected = { yas: " 34 ", role: " admin   " };
    const prop = "isim";
    const actual = utils.verileniTrimle(input, prop);
    expect(actual).toMatchObject(expected);
  });
});

describe("[Görev 3] enBuyukTamsayiyiBul", () => {
  test("[5] bir dizi nesne içindeki en büyük tamsayiyi döndürüyor { tamsayi: 2 }", () => {
    const input = [{ tamsayi: 1 }, { tamsayi: 3 }, { tamsayi: 2 }];
    const expected = 3;
    const actual = utils.enBuyukTamsayiyiBul(input);
    expect(actual).toBe(expected);
  });
});

describe("[Görev 4] Sayici", () => {
  let sayici;
  beforeEach(() => {
    sayici = new utils.Sayici(3); // her test yeni bir sayı ile başlatılıyor
  });
  test("[6] sayici.asagiSay ilk çağırılışında başlangıç sayışını yapıyor", () => {
    const expected = 3;
    const actual = sayici.asagiSay();
    expect(actual).toBe(expected);
  });
  test("[7] sayici.asagiSay İKİNCİ çağırılışında başlangıç eksi 1 sayıyor", () => {
    const expected = 2;
    let actual = sayici.asagiSay();
    actual = sayici.asagiSay();
    expect(actual).toBe(2);
  });
  test("[8] sayıcı sonunda sıfıra ulaşır ama daha aşağı saymaz", () => {
    const expected = 0;
    let actual;
    for (let i = 0; i <= 6; i++) {
      actual = sayici.asagiSay();
    }
    expect(actual).toBe(0);
  });
});

describe("[Görev 5] Mevsimler", () => {
  let mevsimler;
  beforeEach(() => {
    mevsimler = new utils.Mevsimler(); // her test yeni bir mevsimle başlar
  });
  test('[9] mevsimler.sonraki İLK çağırılışında "yaz" döndürüyor', () => {
    const expected = "yaz";
    const actual = mevsimler.sonraki();
    expect(actual).toBe(expected);
  });
  test('[10] mevsimler.sonraki İKİNCİ çağırılışında "sonbahar" döndürüyor', () => {
    const expected = "sonbahar";
    let actual;
    for (let i = 1; i <= 2; i++) {
      actual = mevsimler.sonraki();
    }
    expect(actual).toBe(expected);
  });
  test('[11] mevsimler.sonraki ÜÇÜNCÜ çağırılışında "kış" döndürüyor', () => {
    const expected = "kış";
    let actual;
    for (let i = 1; i <= 3; i++) {
      actual = mevsimler.sonraki();
    }
    expect(actual).toBe(expected);
  });
  test('[12] mevsimler.sonraki DÖRDÜNCÜ çağırılışında "ilkbahar" döndürüyor', () => {
    const expected = "ilkbahar";
    let actual;
    for (let i = 1; i <= 4; i++) {
      actual = mevsimler.sonraki();
    }
    expect(actual).toBe(expected);
  });
  test('[13] mevsimler.sonraki BEŞİNCİ çağırılışında "yaz" döndürüyor', () => {
    const expected = "yaz";
    let actual;
    for (let i = 1; i <= 5; i++) {
      actual = mevsimler.sonraki();
    }
    expect(actual).toBe(expected);
  });
  test('[14] mevsimler.sonraki KIRKINCI çağırılışında "ilkbahar" döndürüyor', () => {
    const expected = "ilkbahar";
    let actual;
    for (let i = 1; i <= 40; i++) {
      actual = mevsimler.sonraki();
    }
    expect(actual).toBe(expected);
  });
});

describe("[Görev 6] Araba", () => {
  let focus;
  beforeEach(() => {
    focus = new utils.Araba("focus", 20, 30); // her test yeni bir araba oluşturur
  });
  test("[15] arabayı sürünce güncellenmiş odometer döndürüyor", () => {
    const expected = 200;
    const actual = focus.sur(expected);
    expect(actual).toBe(expected);
  });
  test("[16] arabayı sürmek benzin tüketiyor", () => {
    const drivenKm = 200;
    const expected = focus.depo - drivenKm / focus.kml;
    focus.sur(drivenKm);
    expect(focus.depo).toBe(expected);
  });
  test("[17] benzinalma arabayı sürmeye izin veriyor", () => {
    const expectedKm = 600;
    const expectedEmptyDepo = 0;
    const actual = focus.sur(700);
    expect(actual).toBe(expectedKm);
    expect(focus.depo).toBe(expectedEmptyDepo);
    const expectedRange = 300;
    const actualRange = focus.benzinal(10);
    expect(actualRange).toBe(expectedRange);
  });
  test("[18] dolu depoya benzin alma etki etmiyor", () => {
    const expected = 20;
    focus.benzinal(20);
    const actual = focus.depo;
    expect(actual).toBe(expected);
  });
});

describe("[Görev 7] asenkronCiftSayi", () => {
  test("[19] bir çift sayı verilirse true çözümlüyor", async () => {
    const expected = true;
    const actual = await utils.asenkronCiftSayi(2);
    expect(actual).toBe(expected);
  });
  test("[20] tek sayı verilirse false çözümlüyor", async () => {
    const expected = false;
    const actual = await utils.asenkronCiftSayi(1);
    expect(actual).toBe(expected);
  });
});

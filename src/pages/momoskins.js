//#region estilos do momo
import momoflor from "../../img/momoEstilos/momoEstilo1.png";
import momochapeu from "../../img/momoEstilos/momoEstilo2.png";
import momoBone from "../../img/momoEstilos/momoEstilo3.png";
import momoCoroa from "../../img/momoEstilos/momoEstilo4.png";
import momoRaviel from "../../img/momoEstilos/momoEstilo5.png";
//#endregion

import momo from "../../img/Momo.png";

export const MORANGO_WALLET_KEY = "momo_morangos_wallet";
export const OWNED_SKINS_KEY    = "momo_owned_skins";
export const ACTIVE_SKIN_KEY    = "momo_active_skin";

export const SKINS = [
  { id: "default", name: "Momo Clássico", img: momo,        price: 0   },
  { id: "flor",    name: "Momo Flor",     img: momoflor,    price: 25  },
  { id: "chapeu",  name: "Momo Chapéu",   img: momochapeu,  price: 50  },
  { id: "coroa",   name: "Momo Boné",     img: momoBone,   price: 75  },
  { id: "lenco",   name: "Momo Coroa",    img: momoCoroa,   price: 100 },
  { id: "bone",    name: "Momo Raviel",   img: momoRaviel,  price: 125 },
];

export function getWalletMorangos() {
  return Number(localStorage.getItem(MORANGO_WALLET_KEY) || 0);
}

export function addTotalMorangos(qtd = 1) {
  const next = getWalletMorangos() + qtd;
  localStorage.setItem(MORANGO_WALLET_KEY, String(next));
  return next;
}

export function getOwnedSkins() {
  try {
    const raw = localStorage.getItem(OWNED_SKINS_KEY);
    return raw ? JSON.parse(raw) : ["default"];
  } catch {
    return ["default"];
  }
}

function saveOwnedSkins(ids) {
  localStorage.setItem(OWNED_SKINS_KEY, JSON.stringify(ids));
}

export function getActiveSkinId() {
  return localStorage.getItem(ACTIVE_SKIN_KEY) || "default";
}

export function setActiveSkin(id) {
  localStorage.setItem(ACTIVE_SKIN_KEY, id);
}

export function getActiveSkinImg() {
  const id = getActiveSkinId();
  return SKINS.find((s) => s.id === id)?.img ?? momo;
}

export function buySkin(id) {
  const skin = SKINS.find((s) => s.id === id);
  if (!skin) return { ok: false, reason: "Skin não encontrada." };

  const owned = getOwnedSkins();
  if (owned.includes(id)) return { ok: false, reason: "Você já possui este estilo." };

  const wallet = getWalletMorangos();
  if (wallet < skin.price) return { ok: false, reason: "Morangos insuficientes." };

  localStorage.setItem(MORANGO_WALLET_KEY, String(wallet - skin.price));
  saveOwnedSkins([...owned, id]);

  return { ok: true };
}

export function getMomoSkinByTotal(_total) {
  return getActiveSkinImg();
}
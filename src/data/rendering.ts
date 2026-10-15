// Rendering dell'impianto a biometano (assets/rendering). Vanno sempre con la didascalia
// prevista da docs/immagini.md e mai nella testata della home.
import ingresso from '../../assets/rendering/biometano-rendering-ingresso.jpg';
import vistaAerea from '../../assets/rendering/biometano-rendering-vista-aerea.jpg';
import vistaLaterale from '../../assets/rendering/biometano-rendering-vista-laterale.jpg';

const didascalia = 'Rendering di un impianto a biometano progettato da Geo Studio';

export const rendering = {
  ingresso: {
    src: ingresso,
    alt: "Ingresso dell'impianto a biometano dalla strada, con viale alberato, digestori e cupola del gasometro",
    didascalia,
  },
  vistaAerea: {
    src: vistaAerea,
    alt: "Vista aerea dell'impianto a biometano con stalle e tettoie dal tetto rosso e il digestore sullo sfondo",
    didascalia,
  },
  vistaLaterale: {
    src: vistaLaterale,
    alt: "Impianto a biometano visto dall'alto: digestore con cupola bianca, stalle e alberature lungo il perimetro",
    didascalia,
  },
};

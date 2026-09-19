import type { AniimoEntry, AniimoForm } from '../types';

export const EVOLUTION_STAGES = ['유년기', '성장기', '성숙기'] as const;
export type AniimoEvolutionStage = typeof EVOLUTION_STAGES[number] | '특수 개체';

export const ANIIMO_ENGLISH_NAMES: Record<string, string> = {
  '001': 'Emberpup', '002': 'Flameruff', '003': 'Scorchhowl', '004': 'Inferlupa', '005': 'Celestis', '006': 'Stellarys',
  '007': 'Chirpi', '008': 'Tromber', '009': 'Cornet', '010': 'Tubster', '011': 'Iris', '012': 'Irisal', '013': 'Skippy',
  '014': 'Pranky', '015': 'Glacy', '016': 'Leafy', '017': 'Nimbi', '018': 'Turbo', '019': 'Dreaple', '020': 'Hummin',
  '021': 'Witchin', '022': 'Tuckin', '023': 'Budclaw', '024': 'Shrubclaw', '025': 'Geoclaw', '026': 'Sparki',
  '027': 'Flamerion', '028': 'Flutternym', '029': 'Gracewing', '031': 'Eko', '032': 'Eklue', '033': 'Budsquire',
  '034': 'Thornblade', '035': 'Melloblum', '036': 'Pomegg', '037': 'Pomawk', '038': 'Dewy', '039': 'Fragrancier',
  '040': 'Wisptis', '041': 'Ignitis', '042': 'Bonesky', '043': 'Fenrier', '044': 'Glynsera', '045': 'Bolty',
  '046': 'Blazen', '047': 'Squarrel', '048': 'Squashel', '049': 'Susuta', '050': 'Popota', '051': 'Piopiota',
  '052': 'Panpanta', '053': 'Shelly', '054': 'Sheldon', '055': 'Sherro', '056': 'Baleetle', '057': 'Waleetle',
  '058': 'Bouldus', '059': 'Fentuft', '060': 'Fenmane', '061': 'Helmut', '062': 'Pawney', '063': 'Rookey',
  '064': 'Jawling', '065': 'Helmwhelp', '066': 'Helgon', '067': 'Infergon', '068': 'Cubbo', '069': 'Grizbo',
  '070': 'Pebbling', '071': 'Lavazar', '072': 'Magmarex', '073': 'Geodeback', '074': 'Minespine', '075': 'Cozite',
  '076': 'Bailite', '077': 'Bulbly', '078': 'Veilfloat', '079': 'Luminelle', '080': 'Fahloo', '081': 'Erlath',
  '082': 'Besauce', '10002': 'Dazmand', '10003': 'Fulmintis', '11001': 'Little Fire Spirit', '99996': 'Lunara', '99998': 'Helion'
};

export const getAniimoEvolutionStage = (item: AniimoEntry, form?: AniimoForm): AniimoEvolutionStage => {
  const evolution = form?.evolution?.length ? form.evolution : item.evolution;
  const matchingNode = evolution.find(node => node.number === item.number && (!form || node.formKey === form.key))
    || evolution.find(node => node.number === item.number);

  return EVOLUTION_STAGES.includes(matchingNode?.stage as typeof EVOLUTION_STAGES[number])
    ? matchingNode!.stage as typeof EVOLUTION_STAGES[number]
    : '특수 개체';
};

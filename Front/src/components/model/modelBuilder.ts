import { cloneDeep, uniqueId } from 'lodash';

export type Sections = 'DoubleSection' | 'SimpleSection';

// DoubleSection.vue
export interface DoubleSection {
  id: string;
  name: 'DoubleSection';
  vModelRightVal: string;
  vModelLeftVal: string;
}

// DoubleSection.vue
export interface SimpleSection {
  id: string;
  name: 'SimpleSection';
  vModel: string;
}

const initDoubleSection: DoubleSection = {
  id: uniqueId(),
  name: 'DoubleSection',
  vModelLeftVal: '',
  vModelRightVal: '',
};

const initSimpleSection: SimpleSection = {
  id: uniqueId(),
  name: 'SimpleSection',
  vModel: '',
};

const init = [initDoubleSection, initSimpleSection];

export function initSection(section: Sections) {
  return cloneDeep(init.filter((i) => i.name === section)[0]);
}

export type SectionsCalque = (DoubleSection | SimpleSection)[];

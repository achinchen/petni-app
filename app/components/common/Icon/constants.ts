import Card from '~/assets/images/icon/card.svg';
import CardActive from '~/assets/images/icon/card-active.svg';
import Love from '~/assets/images/icon/love.svg';
import LoveActive from '~/assets/images/icon/love-active.svg';
import LoveActiveFill from '~/assets/images/icon/love-active-fill.svg';
import ColorPalette from '~/assets/images/icon/color-palette.svg';
import ColorPaletteActive from '~/assets/images/icon/color-palette-active.svg';
import Collar from '~/assets/images/icon/collar.svg';
import CollarActive from '~/assets/images/icon/collar-active.svg';
import Hospital from '~/assets/images/icon/hospital.svg';
import HospitalActive from '~/assets/images/icon/hospital-active.svg';
import Search from '~/assets/images/icon/search.svg';
import ArrowLeft from '~/assets/images/icon/arrow-left.svg';
import ArrowRight from '~/assets/images/icon/arrow-right.svg';
import Phone from '~/assets/images/icon/phone.svg';
import Location from '~/assets/images/icon/location.svg';
import Male from '~/assets/images/icon/male.svg';
import Female from '~/assets/images/icon/female.svg';
import CloseSm from '~/assets/images/icon/close-sm.svg';
import Close from '~/assets/images/icon/close.svg';
import CatActive from '~/assets/images/icon/cat-active.svg';
import Cat from '~/assets/images/icon/cat.svg';
import DogActive from '~/assets/images/icon/dog-active.svg';
import Dog from '~/assets/images/icon/dog.svg';
import Bone from '~/assets/images/icon/bone.svg';
import Fish from '~/assets/images/icon/fish.svg';
import Info from '~/assets/images/icon/info.svg';
import InfoDark from '~/assets/images/icon/info-dark.svg';
import Filter from '~/assets/images/icon/filter.svg';
import Undo from '~/assets/images/icon/undo.svg';
import Note from '~/assets/images/icon/note.svg';
import Edit from '~/assets/images/icon/edit.svg';

export const ICONS = {
  Card,
  CardActive,
  Love,
  LoveActive,
  LoveActiveFill,
  ColorPalette,
  ColorPaletteActive,
  Collar,
  CollarActive,
  Hospital,
  HospitalActive,
  Search,
  ArrowLeft,
  ArrowRight,
  Phone,
  Location,
  Male,
  Female,
  Close,
  CloseSm,
  CatActive,
  Cat,
  DogActive,
  Dog,
  Bone,
  Fish,
  Info,
  InfoDark,
  Filter,
  Undo,
  Note,
  Edit
};

export const ALT_DICT: { [key in keyof typeof ICONS]: string } = {
  ...ICONS,
  ArrowLeft: 'Go previous',
  ArrowRight: 'Go next',
  Close: 'Close',
  CloseSm: 'Delete',
  Cat: 'cat',
  Dog: 'dog',
  Male: 'male',
  Female: 'female'
};

export const OutlineCircleAdd =
  'M18 6C15.6266 6 13.3065 6.70379 11.3331 8.02236C9.35977 9.34094 7.8217 11.2151 6.91345 13.4078C6.0052 15.6005 5.76756 18.0133 6.23058 20.3411C6.6936 22.6689 7.83649 24.807 9.51472 26.4853C11.193 28.1635 13.3311 29.3064 15.6589 29.7694C17.9867 30.2325 20.3995 29.9948 22.5922 29.0865C24.7849 28.1783 26.6591 26.6402 27.9776 24.6669C29.2962 22.6935 30 20.3734 30 18C30 16.4241 29.6896 14.8637 29.0865 13.4078C28.4835 11.9519 27.5996 10.629 26.4853 9.51472C25.371 8.40042 24.0481 7.5165 22.5922 6.91344C21.1363 6.31039 19.5759 6 18 6ZM21.6 19.2H19.2V21.6C19.2 21.9183 19.0736 22.2235 18.8485 22.4485C18.6235 22.6736 18.3183 22.8 18 22.8C17.6817 22.8 17.3765 22.6736 17.1515 22.4485C16.9264 22.2235 16.8 21.9183 16.8 21.6V19.2H14.4C14.0817 19.2 13.7765 19.0736 13.5515 18.8485C13.3264 18.6235 13.2 18.3183 13.2 18C13.2 17.6817 13.3264 17.3765 13.5515 17.1515C13.7765 16.9264 14.0817 16.8 14.4 16.8H16.8V14.4C16.8 14.0817 16.9264 13.7765 17.1515 13.5515C17.3765 13.3264 17.6817 13.2 18 13.2C18.3183 13.2 18.6235 13.3264 18.8485 13.5515C19.0736 13.7765 19.2 14.0817 19.2 14.4V16.8H21.6C21.9183 16.8 22.2235 16.9264 22.4485 17.1515C22.6736 17.3765 22.8 17.6817 22.8 18C22.8 18.3183 22.6736 18.6235 22.4485 18.8485C22.2235 19.0736 21.9183 19.2 21.6 19.2Z';

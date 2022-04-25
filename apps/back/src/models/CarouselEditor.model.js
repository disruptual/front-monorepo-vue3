import { CAROUSEL_VIEW_MODES } from '@/utils/constants';
import { nanoid } from 'nanoid';

export class CarouselEditor {
  constructor({ settings }) {
    this.settings = settings;
    this.settings.carouselItems = this.settings.carouselItems ?? [];
    this.selectedSlideId = this.desktopSlides[0]?.id;
    this.createdIds = [];
    this.deletedIds = [];
    this.newMedias = {};

    this.addSlide = this.addSlide.bind(this);
  }

  get currentSlides() {
    return this.viewMode === CAROUSEL_VIEW_MODES.DESKTOP
      ? this.desktopSlides
      : this.mobileSlides;
  }

  get desktopSlides() {
    return this.settings.carouselItems
      .filter(i => i.desktop)
      .sort((a, b) => a.position - b.position);
  }

  get mobileSlides() {
    return this.settings.carouselItems
      .filter(i => !i.desktop)
      .sort((a, b) => a.position - b.position);
  }

  get selectedSlide() {
    return this.settings.carouselItems.find(
      slide => slide.id === this.selectedSlideId
    );
  }

  get viewMode() {
    if (!this.selectedSlide) return CAROUSEL_VIEW_MODES.DESKTOP;

    return this.selectedSlide.desktop
      ? CAROUSEL_VIEW_MODES.DESKTOP
      : CAROUSEL_VIEW_MODES.MOBILE;
  }

  get exportJSON() {
    const { uri, id, type, ...settings } = this.settings;

    return {
      ...settings,
      carouselItems: settings.carouselItems.map(carouselItem => {
        const { '@id': uri, '@type': type, media, ...item } = carouselItem;

        // return { ...item, media: media && media.url }
        return item;
      })
    };
  }

  getSlideSrc(slide) {
    if (!slide) return null;

    return this.newMedias[slide.id]?.data ?? slide.media?.url;
  }

  moveSlide(slide, newIndex) {
    const isDesktop = slide.desktop;
    const slides = isDesktop ? this.desktopSlides : this.mobileSlides;

    const oldIndex = slides.indexOf(slide);
    if (oldIndex === newIndex) return;

    slides.splice(oldIndex, 1);
    slides.splice(newIndex, 0, slide);
    slides.forEach((slide, index) => {
      slide.position = index;
    });
  }

  addSlide({ isDesktop }) {
    const id = nanoid();
    const newSlide = {
      id,
      media: null,
      link: '/',
      title: 'Votre titre',
      content: 'Votre sous-titre',
      btn: 'Votre CTA',
      textPositionX: 1,
      textPositionXEnd: 3,
      textPositionY: 1,
      textPositionYEnd: 3,
      textHasAnOverlay: true,
      position: this.currentSlides.length,
      desktop: isDesktop,
      carousel: this.settings.uri,
      targetBlank: false
    };
    this.settings.carouselItems.push(newSlide);

    this.createdIds.push(id);
    this.selectedSlideId = newSlide.id;
  }

  deleteSlide(slideId) {
    const index = this.settings.carouselItems.findIndex(s => s.id === slideId);
    this.settings.carouselItems.splice(index, 1);

    if (this.createdIds.includes(slideId)) {
      this.createdIds.splice(this.createdIds.indexOf(slideId), 1);
    } else {
      this.deletedIds.push(slideId);
    }

    if (this.selectedSlideId === slideId) {
      this.selectedSlideId = this.desktopSlides[0]?.id;
    }
  }

  reset() {
    this.createdIds = [];
    this.deletedIds = [];
    this.newMedias = {};
  }

  import(settings) {
    settings.id = this.settings.id;
    settings.uri = this.settings.uri;

    settings.carouselItems.forEach(item => {
      item.id = nanoid();
      item.carousel = this.settings.uri;
    });

    this.deletedIds = this.settings.carouselItems.map(item => item.id);
    this.newMedias = [];

    this.settings = settings;
    this.selectedSlideId = this.desktopSlides[0].id;
    this.createdIds = settings.carouselItems.map(item => item.id);
  }
}

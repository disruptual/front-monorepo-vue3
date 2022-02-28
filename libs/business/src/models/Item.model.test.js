import { Item } from './Item.model';
import {
  ITEM_PUBLICATION_STATES,
  ITEM_PUBLICATION_STATE_TRANSITIONS
} from '../enums/item.enums';

describe('ItemModel', () => {
  it('should return formatedPrice', () => {
    const item = new Item({ price: 10.5 });

    expect(item.formatedPrice).toBe('10,50€');
  });

  it('should be published', () => {
    const item = new Item({
      publicationState: ITEM_PUBLICATION_STATES.PUBLISHED
    });

    expect(item.isPublished).toBe(true);
  });

  it('should be unpublished', () => {
    const item = new Item({
      publicationState: ITEM_PUBLICATION_STATES.UNPUBLISHED
    });

    expect(item.isUnpublished).toBe(true);
  });

  it('should be in vacancy mode', () => {
    const item = new Item({
      publicationState: ITEM_PUBLICATION_STATES.VACANCY
    });

    expect(item.isVacancy).toBe(true);
  });

  it('should be ordered', () => {
    const item = new Item({
      publicationState: ITEM_PUBLICATION_STATES.ORDERED
    });

    expect(item.isOrdered).toBe(true);
  });

  it('should be purchased', () => {
    const item = new Item({
      publicationState: ITEM_PUBLICATION_STATES.PURCHASED
    });

    expect(item.isPurchased).toBe(true);
  });

  it('should be deleted', () => {
    const item = new Item({
      publicationState: ITEM_PUBLICATION_STATES.DELETED
    });

    expect(item.isDeleted).toBe(true);
  });

  it('should get the correct unpublish transition', () => {
    const item = new Item({
      publicationState: ITEM_PUBLICATION_STATES.ORDERED
    });

    expect(item.unpublishTransition).toBe(
      ITEM_PUBLICATION_STATE_TRANSITIONS.UNPUBLISHED_ORDERED_ITEM
    );

    item.publicationState = ITEM_PUBLICATION_STATES.PUBLISHED;
    expect(item.unpublishTransition).toBe(
      ITEM_PUBLICATION_STATE_TRANSITIONS.UNPUBLISH
    );
  });

  it('should get the correct delete transition', () => {
    const item = new Item({
      publicationState: ITEM_PUBLICATION_STATES.UNPUBLISHED
    });

    expect(item.deleteTransition).toBe(
      ITEM_PUBLICATION_STATE_TRANSITIONS.DELETE_UNPUBLISHED_ITEM
    );

    item.publicationState = ITEM_PUBLICATION_STATES.VACANCY;
    expect(item.deleteTransition).toBe(
      ITEM_PUBLICATION_STATE_TRANSITIONS.DELETE_VACANCY_MODE_ITEM
    );

    item.publicationState = ITEM_PUBLICATION_STATES.PUBLISHED;
    expect(item.deleteTransition).toBe(
      ITEM_PUBLICATION_STATE_TRANSITIONS.DELETE_PUBLISHED_ITEM
    );
  });

  it('should return the correct unpublishable state', () => {
    const item = new Item({
      publicationState: null
    });
    expect(item.canUnpublish).toBe(false);

    item.publicationState = ITEM_PUBLICATION_STATES.PUBLISHED;
    expect(item.canUnpublish).toBe(true);

    item.publicationState = ITEM_PUBLICATION_STATES.ORDERED;
    expect(item.canUnpublish).toBe(true);
  });

  it('should return the correct delete state', () => {
    const item = new Item({
      publicationState: null
    });
    expect(item.canDelete).toBe(false);

    item.publicationState = ITEM_PUBLICATION_STATES.PUBLISHED;
    expect(item.canDelete).toBe(true);

    item.publicationState = ITEM_PUBLICATION_STATES.UNPUBLISHED;
    expect(item.canDelete).toBe(true);

    item.publicationState = ITEM_PUBLICATION_STATES.VACANCY;
    expect(item.canDelete).toBe(true);
  });

  it('should return the correct republishable state', () => {
    const item = new Item({
      publicationState: null
    });
    expect(item.canRepublish).toBe(false);

    item.publicationState = ITEM_PUBLICATION_STATES.UNPUBLISHED;
    expect(item.canRepublish).toBe(true);
  });
});

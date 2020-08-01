// @flow

import { DataProcessingUtils } from 'lattice-fabricate';

import { SLEEPING_ACTIVITY_CONSTS } from '../../constants/SchemaConstants';

const { getPageSectionKey } = DataProcessingUtils;

const {
  MEDIA,
  BG_TV,
  BG_TV_AGE,
  BG_AUDIO,
  BG_AUDIO_TYPE,
  BG_MEDIA_PROPORITION
} = SLEEPING_ACTIVITY_CONSTS;

const createSchema = (pageNum :number) => ({
  type: 'object',
  title: '',
  properties: {
    [getPageSectionKey(pageNum, 1)]: {
      type: 'object',
      title: '',
      properties: {
        [MEDIA]: {
          title: `Was media being used in the same room as the child while they were sleeping?
            This could include television, movies, video or computer games, radio or CDs,
            but does not include white noise machines. `,
          type: 'string',
          enum: ['Yes', 'No', "Don't Know"]
        }
      },
      dependencies: {
        [MEDIA]: {
          oneOf: [
            {
              properties: {
                [MEDIA]: {
                  enum: ['No', "Don't Know"]
                }
              }
            },
            {
              properties: {
                [MEDIA]: {
                  enum: ['Yes']
                },
                [BG_TV]: {
                  title: 'Was there a TV on in the background while your child did this activity?',
                  type: 'string',
                  enum: ['Yes', 'No', "Don't Know"]
                }
              },
              dependencies: {
                [BG_TV]: {
                  oneOf: [
                    {
                      properties: {
                        [BG_TV]: {
                          enum: ['No', "Don't Know"]
                        },
                        [BG_AUDIO]: {
                          title: `Was there audio entertainment (e.g., music, talk radio)
                          on in the background while your child was doing this activity?`,
                          type: 'string',
                          enum: ['Yes', 'No', "Don't Know"]
                        }
                      },
                      dependencies: {
                        [BG_AUDIO]: {
                          oneOf: [
                            {
                              properties: {
                                [BG_AUDIO]: {
                                  enum: ['No', "Don't Know"]
                                }
                              }
                            },
                            {
                              properties: {
                                [BG_AUDIO]: {
                                  enum: ['Yes']
                                },
                                [BG_AUDIO_TYPE]: {
                                  title: 'What kind of audio was in the background',
                                  type: 'string',
                                  enum: ['Music', 'Talk Radio', 'Podcast', "Don't Know"]
                                },
                                [BG_MEDIA_PROPORITION]: {
                                  title: `Approximately what percentage of time that the child was
                                  sleeping was the background media in use?
                                  For example, if your child slept for 10 hours and the radio was on for 1,
                                   enter 10; if on the full time, enter 100.`,
                                  type: 'number',
                                }
                              }
                            }
                          ]
                        }
                      }
                    },
                    {
                      properties: {
                        [BG_TV]: {
                          enum: ['Yes']
                        },
                        [BG_TV_AGE]: {
                          title: `Was the program for your child's age, for older children,
                          for younger children, or for adults?`,
                          type: 'string',
                          enum: ["Child's age", 'Older children', 'Younger children', 'Adults', "Don't know/other"],
                        },
                        [BG_AUDIO]: {
                          title: `Was there audio entertainment (e.g., music, talk radio)
                          on in the background while your child was doing this activity?`,
                          type: 'string',
                          enum: ['Yes', 'No', "Don't Know"]
                        }
                      },
                      dependencies: {
                        [BG_AUDIO]: {
                          oneOf: [
                            {
                              properties: {
                                [BG_AUDIO]: {
                                  enum: ['No', "Don't Know"]
                                },
                                [BG_MEDIA_PROPORITION]: {
                                  title: `Approximately what percentage of time that the child was
                                  sleeping was the background media in use?
                                  For example, if your child slept for 10 hours and the radio was on for 1,
                                   enter 10; if on the full time, enter 100.`,
                                  type: 'number',
                                }
                              }
                            },
                            {
                              properties: {
                                [BG_AUDIO]: {
                                  enum: ['Yes']
                                },
                                [BG_AUDIO_TYPE]: {
                                  title: 'What kind of audio was in the background',
                                  type: 'string',
                                  enum: ['Music', 'Talk Radio', 'Podcast']
                                },
                                [BG_MEDIA_PROPORITION]: {
                                  title: `Approximately what percentage of time that the child was
                                  sleeping was the background media in use?
                                  For example, if your child slept for 10 hours and the radio was on for 1,
                                   enter 10; if on the full time, enter 100.`,
                                  type: 'number',
                                }
                              }
                            }
                          ]
                        }
                      }
                    }
                  ]
                }
              }
            }
          ]
        }
      }
    }
  }
});

const createUiSchema = (pageNum :number) => ({
  [getPageSectionKey(pageNum, 1)]: {
    classNames: 'column-span-12 grid-container',
    [MEDIA]: {
      classNames: 'column-span-12',
      'ui:widget': 'radio'
    },
    [BG_TV]: {
      classNames: 'column-span-12',
      'ui:widget': 'radio'
    },
    [BG_AUDIO]: {
      classNames: 'column-span-12',
      'ui:widget': 'radio'
    },
    [BG_TV_AGE]: {
      classNames: 'column-span-12',
      'ui:widget': 'radio' // should be radiowith other
    },
    [BG_MEDIA_PROPORITION]: {
      classNames: 'column-span-12',
    },
    [BG_AUDIO_TYPE]: {
      classNames: 'column-span-12',
      'ui:widget': 'OtherRadioWidget'
    }
  }
});

export {
  createUiSchema,
  createSchema
};

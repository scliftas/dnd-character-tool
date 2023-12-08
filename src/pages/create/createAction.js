async function createAction({ request }) {
  switch (request.method) {
    case "POST": {
      const formData = await request.formData();
      const payload = Object.fromEntries(formData);

      const saved_characters =
        JSON.parse(localStorage.getItem("characters")) ?? [];

      saved_characters.push({
        name: payload.name,
        race: {
          name: payload.race,
          traits: [],
        },
        class: {
          name: payload.class,
          subclass: {
            name: payload.subclass,
          },
        },
        background: {
          name: payload.background,
        },
        level: payload.level,
        proficiency: payload.proficiency,
        passive_perception: payload.passive_perception,
        inspiration: payload.inspiration,
        passive_insight: payload.passive_insight,
        armour_class: payload.armour_class,
        initiative: payload.iniatitive,
        speed: payload.speed,
        hit_point_maximum: payload.hit_point_maximum,
        temporary_hit_points: payload.temporary_hit_points,
        spell_attack_bonus: payload.spell_attack_bonus,
        spell_save_dc: payload.spell_save_dc,
        hit_dice: {
          total: payload.hit_dice_total,
          used: payload.hit_dice_used,
        },
        death_saves: {
          successes: payload.death_save_successes,
          failures: payload.death_save_failures,
        },
        proficiencies: {
          light_armour: payload.proficiency_light_armour === "on",
          simple_weapons: payload.proficiency_simple_weapons === "on",
          medium_armour: payload.proficiency_medium_armour === "on",
          martial_weapons: payload.proficiency_martial_weapons === "on",
          heavy_armour: payload.proficiency_heavy_armour === "on",
          shields: payload.proficiency_shields === "on",
        },
        ability_scores: {
          strength: {
            score: payload.strength_score,
            saving_throws: payload.strength_saving_throws,
            skill_proficiencies: [
              {
                name: "athletics",
                label: "Athletics",
                proficient: payload.strength_athletics_proficient === "on",
                expertise: payload.strength_athletics_expertise === "on",
              },
            ],
          },
          dexterity: {
            score: payload.dexterity_score,
            saving_throws: payload.dexterity_saving_throws,
            skill_proficiencies: [
              {
                name: "acrobatics",
                label: "Acrobatics",
                proficient: payload.dexterity_acrobatics_proficient === "on",
                expertise: payload.dexterity_acrobatics_expertise === "on",
              },
              {
                name: "sleight_of_hand",
                label: "Sleight of Hand",
                proficient:
                  payload.dexterity_sleight_of_hand_proficient === "on",
                expertise: payload.dexterity_sleight_of_hand_expertise === "on",
              },
              {
                name: "stealth",
                label: "Stealth",
                proficient: payload.dexterity_stealth_proficient === "on",
                expertise: payload.dexterity_stealth_expertise === "on",
              },
            ],
          },
          constitution: {
            score: payload.constitution_score,
            saving_throws: payload.constitution_saving_throws,
          },
          intelligence: {
            score: payload.intelligence_score,
            saving_throws: payload.intelligence_saving_throws,
            skill_proficiencies: [
              {
                name: "arcana",
                label: "Arcana",
                proficient: payload.intelligence_arcana_proficient === "on",
                expertise: payload.intelligence_arcana_expertise === "on",
              },
              {
                name: "history",
                label: "History",
                proficient: payload.intelligence_history_proficient === "on",
                expertise: payload.intelligence_history_expertise === "on",
              },
              {
                name: "investigation",
                label: "Investigation",
                proficient:
                  payload.intelligence_investigation_proficient === "on",
                expertise:
                  payload.intelligence_investigation_expertise === "on",
              },
              {
                name: "nature",
                label: "Nature",
                proficient: payload.intelligence_nature_proficient === "on",
                expertise: payload.intelligence_nature_expertise === "on",
              },
              {
                name: "religion",
                label: "Religion",
                proficient: payload.intelligence_religion_proficient === "on",
                expertise: payload.intelligence_religion_expertise === "on",
              },
            ],
          },
          wisdom: {
            score: payload.wisdom_score,
            saving_throws: payload.wisdom_saving_throws,
            skill_proficiencies: [
              {
                name: "animal_handling",
                label: "Animal Handling",
                proficient: payload.wisdom_animal_handling_proficient === "on",
                expertise: payload.wisdom_animal_handling_expertise === "on",
              },
              {
                name: "insight",
                label: "Insight",
                proficient: payload.wisdom_insight_proficient === "on",
                expertise: payload.wisdom_insight_expertise === "on",
              },
              {
                name: "medicine",
                label: "Medicine",
                proficient: payload.wisdom_medicine_proficient === "on",
                expertise: payload.wisdom_medicine_expertise === "on",
              },
              {
                name: "perception",
                label: "Perception",
                proficient: payload.wisdom_perception_proficient === "on",
                expertise: payload.wisdom_perception_expertise === "on",
              },
              {
                name: "survival",
                label: "Survival",
                proficient: payload.wisdom_survival_proficient === "on",
                expertise: payload.wisdom_survival_expertise === "on",
              },
            ],
          },
          charisma: {
            score: payload.charisma_score,
            saving_throws: payload.charisma_saving_throws,
            skill_proficiencies: [
              {
                name: "deception",
                label: "Deception",
                proficient: payload.charisma_deception_proficient === "on",
                expertise: payload.charisma_deception_expertise === "on",
              },
              {
                name: "intimidation",
                label: "Intimidation",
                proficient: payload.charisma_intimidation_proficient === "on",
                expertise: payload.charisma_intimidation_expertise === "on",
              },
              {
                name: "performance",
                label: "Performance",
                proficient: payload.charisma_performance_proficient === "on",
                expertise: payload.charisma_performance_expertise === "on",
              },
              {
                name: "persuasion",
                label: "Persuasion",
                proficient: payload.charisma_persuasion_proficient === "on",
                expertise: payload.charisma_persuasion_expertise === "on",
              },
            ],
          },
        },
        languages: [],
        tools: [],
        attacks: [],
        spells: [],
        spell_slots: {
          1: {
            total: payload.lvl1_spell_slots_total,
            used: payload.lvl1_spell_slots_used,
          },
          2: {
            total: payload.lvl2_spell_slots_total,
            used: payload.lvl2_spell_slots_used,
          },
          3: {
            total: payload.lvl3_spell_slots_total,
            used: payload.lvl3_spell_slots_used,
          },
          4: {
            total: payload.lvl4_spell_slots_total,
            used: payload.lvl4_spell_slots_used,
          },
          5: {
            total: payload.lvl5_spell_slots_total,
            used: payload.lvl5_spell_slots_used,
          },
          6: {
            total: payload.lvl6_spell_slots_total,
            used: payload.lvl6_spell_slots_used,
          },
          7: {
            total: payload.lvl7_spell_slots_total,
            used: payload.lvl7_spell_slots_used,
          },
          8: {
            total: payload.lvl8_spell_slots_total,
            used: payload.lvl8_spell_slots_used,
          },
          9: {
            total: payload.lvl9_spell_slots_total,
            used: payload.lvl9_spell_slots_used,
          },
        },
      });

      localStorage.setItem("characters", JSON.stringify(saved_characters));

      return new Response("", {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }
    default: {
      throw new Response("", { status: 405 });
    }
  }
}

export default createAction;

import { Form } from "react-router-dom";
import Input from "../../components/Input";
import ability_scores from "../../schema/ability_scores.json";
import "./create.css";

function Create() {
  return (
    <section>
      <Form method="post">
        <input
          id="input_name"
          name="name"
          type="text"
          placeholder="New Character"
          aria-label="Character name"
        />

        <fieldset id="details">
          <legend>Details</legend>

          <Input name="race" type="text" label="Race" />
          <Input name="class" type="text" label="Class" />
          <Input name="subclass" type="text" label="Subclass" />
          <Input name="background" type="text" label="Background" />
          <Input name="level" type="number" label="Level" />
        </fieldset>

        <fieldset id="stats">
          <legend>Stats</legend>

          <Input name="proficiency" type="number" label="Proficiency" />
          <Input
            name="passive_perception"
            type="number"
            label="Passive Perception"
          />
          <Input name="inspiration" type="number" label="Inspiration" />
          <Input name="passive_insight" type="number" label="Passive Insight" />

          <Input name="armour_class" type="number" label="Armour Class" />
          <Input name="initiative" type="number" label="Iniatitive" />
          <Input name="speed" type="number" label="Speed" />
          <Input
            name="hit_point_maximum"
            type="number"
            label="Hit Point Maximum"
          />
          <Input
            name="temporary_hit_points"
            type="number"
            label="Temporary Hit Points"
          />

          <Input
            name="spell_attack_bonus"
            type="number"
            label="Spell Attack Bonus"
          />
          <Input name="spell_save_dc" type="number" label="Spell Save DC" />
        </fieldset>

        <div className="flex_split">
          <div>
            <fieldset id="hit_dice">
              <legend>Hit Dice</legend>

              <Input name="hit_dice_used" type="number" label="Used" />
              <Input name="hit_dice_total" type="number" label="Total" />
            </fieldset>

            <fieldset id="death_saves">
              <legend>Death Saves</legend>

              <Input
                name="death_save_successes"
                type="number"
                label="Successes"
              />
              <Input
                name="death_save_failures"
                type="number"
                label="Failures"
              />
            </fieldset>
          </div>

          <fieldset id="proficiencies">
            <legend>Proficiencies</legend>

            <Input
              name="proficiency_light_armour"
              type="checkbox"
              label="Light Armour"
            />

            <Input
              name="proficiency_medium_armour"
              type="checkbox"
              label="Medium Armour"
            />

            <Input
              name="proficiency_heavy_armour"
              type="checkbox"
              label="Heavy Armour"
            />

            <Input
              name="proficiency_simple_weapons"
              type="checkbox"
              label="Simple Weapons"
            />

            <Input
              name="proficiency_martial_weapons"
              type="checkbox"
              label="Martial Weapons"
            />

            <Input name="proficiency_shields" type="checkbox" label="Shields" />
          </fieldset>
        </div>

        <fieldset id="ability_scores">
          <legend>Ability Scores</legend>

          {ability_scores.map((ability_score) => (
            <fieldset key={ability_score.name} className="ability_score">
              <legend>{ability_score.label}</legend>

              <Input
                name={`${ability_score.name}_score`}
                type="number"
                label="Score"
              />

              <Input
                name={`${ability_score.name}_saving_throws`}
                type="checkbox"
                label="Saving Throws"
              />

              {ability_score.skill_proficiencies.map((skill_proficiency) => (
                <div
                  key={skill_proficiency.name}
                  className="ability_score_proficiency"
                >
                  <p>{skill_proficiency.label}</p>

                  <Input
                    name={`${ability_score.name}_${skill_proficiency.name}_proficient`}
                    type="checkbox"
                    label="Proficient"
                  />

                  <Input
                    name={`${ability_score.name}_${skill_proficiency.name}_expertise`}
                    type="checkbox"
                    label="Expertise"
                  />
                </div>
              ))}
            </fieldset>
          ))}
        </fieldset>

        <fieldset id="spell_slots">
          <legend>Spell Slots</legend>

          {Array.from("123456789").map((spell_level) => (
            <div key={spell_level} className="spell_slot">
              <p>Level {spell_level}</p>

              <Input
                name={`lvl${spell_level}_total`}
                type="number"
                label="Total"
              />
              <Input name={`lvl${spell_level}_used`} type="number" label="Used" />
            </div>
          ))}
        </fieldset>

        <div id="actions">
          <input id="button_submit" type="submit" value="Create Character" />
        </div>
      </Form>
    </section>
  );
}

export default Create;

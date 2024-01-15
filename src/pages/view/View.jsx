import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { STLLoader } from "three/addons/loaders/STLLoader.js";
import { useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import Input from "../../components/Input";
import ability_scores from "../../schema/ability_scores.json";
import "./view.css";

function View(props) {
  const { character } = props;

  const threeCanvas = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(220, 220),
      new THREE.MeshPhongMaterial({ color: 0xcbcbcb, specular: 0x474747 })
    );
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -0.5;
    scene.add(plane);

    plane.receiveShadow = true;

    const camera = new THREE.PerspectiveCamera(35, 400 / 500, 1, 1000);
    camera.position.set(3, 15, 3);

    const cameraTarget = new THREE.Vector3(0, 40, 0);

    scene.add(new THREE.HemisphereLight(0x8d7c7c, 0x494966, 3));

    function addShadowedLight(x, y, z, color, intensity) {
      const directionalLight = new THREE.DirectionalLight(color, intensity);
      directionalLight.position.set(x, y, z);
      scene.add(directionalLight);

      directionalLight.castShadow = true;

      const d = 1;
      directionalLight.shadow.camera.left = -d;
      directionalLight.shadow.camera.right = d;
      directionalLight.shadow.camera.top = d;
      directionalLight.shadow.camera.bottom = -d;

      directionalLight.shadow.camera.near = 1;
      directionalLight.shadow.camera.far = 4;

      directionalLight.shadow.bias = -0.002;
    }

    addShadowedLight(1, 1, 1, 0xffffff, 3.5);

    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(400, 500);
    threeCanvas.current.innerHTML = "";
    threeCanvas.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const loader = new STLLoader();

    loader.load("../test-model.stl", function (geometry) {
      const material = new THREE.MeshPhongMaterial({
        color: 0xd5d5d5,
        specular: 0x494949,
        shininess: 200,
        flatShading: true,
      });
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(0, -0.37, -0.6);
      mesh.rotation.set(-Math.PI / 2, 0, 0);
      mesh.scale.set(2, 2, 2);

      scene.add(mesh);
    });

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      render();
    }

    function render() {
      const timer = Date.now() * 0.0001;

      camera.position.x = Math.cos(timer) * 200;
      camera.position.z = Math.sin(timer) * 200;

      camera.lookAt(cameraTarget);

      renderer.render(scene, camera);
    }

    console.log("Use effect");
    animate();
  }, []);

  return (
    <div id="view">
      <div>
        <div id="three-scene" ref={threeCanvas} />

        <fieldset id="details">
          <legend>Details</legend>

          <Input name="name" type="text" label="Name" value={character.name} />
          <Input
            name="race"
            type="text"
            label="Race"
            value={character.race.name}
          />
          <Input
            name="class"
            type="text"
            label="Class"
            value={character.class.name}
          />
          <Input
            name="subclass"
            type="text"
            label="Subclass"
            value={character.class.subclass.name}
          />
          <Input
            name="background"
            type="text"
            label="Background"
            value={character.background.name}
          />
          <Input
            name="level"
            type="number"
            label="Level"
            value={character.level}
          />
        </fieldset>
      </div>

      <div>
        <fieldset id="stats">
          <legend>Stats</legend>

          <Input
            name="proficiency"
            type="number"
            label="Proficiency"
            value={character.proficiency}
          />
          <Input
            name="passive_perception"
            type="number"
            label="Passive Perception"
            value={character.passive_perception}
          />
          <Input
            name="inspiration"
            type="number"
            label="Inspiration"
            value={character.inspiration}
          />
          <Input
            name="passive_insight"
            type="number"
            label="Passive Insight"
            value={character.passive_insight}
          />

          <Input
            name="armour_class"
            type="number"
            label="Armour Class"
            value={character.armour_class}
          />
          <Input
            name="initiative"
            type="number"
            label="Iniatitive"
            value={character.initiative}
          />
          <Input
            name="speed"
            type="number"
            label="Speed"
            value={character.speed}
          />
          <Input
            name="hit_point_maximum"
            type="number"
            label="Hit Point Maximum"
            value={character.hit_point_maximum}
          />
          <Input
            name="temporary_hit_points"
            type="number"
            label="Temporary Hit Points"
            value={character.temporary_hit_points}
          />

          <Input
            name="spell_attack_bonus"
            type="number"
            label="Spell Attack Bonus"
            value={character.spell_attack_bonus}
          />
          <Input
            name="spell_save_dc"
            type="number"
            label="Spell Save DC"
            value={character.spell_save_dc}
          />
        </fieldset>

        <div className="flex_split">
          <div>
            <fieldset id="hit_dice">
              <legend>Hit Dice</legend>

              <Input
                name="hit_dice_used"
                type="number"
                label="Used"
                value={character.hit_dice.used}
              />
              <Input
                name="hit_dice_total"
                type="number"
                label="Total"
                value={character.hit_dice.total}
              />
            </fieldset>

            <fieldset id="death_saves">
              <legend>Death Saves</legend>

              <Input
                name="death_save_successes"
                type="number"
                label="Successes"
                value={character.death_saves.successes}
              />
              <Input
                name="death_save_failures"
                type="number"
                label="Failures"
                value={character.death_saves.failures}
              />
            </fieldset>
          </div>

          <fieldset id="proficiencies">
            <legend>Proficiencies</legend>

            <Input
              name="proficiency_light_armour"
              type="checkbox"
              label="Light Armour"
              value={character.proficiencies.light_armour}
            />

            <Input
              name="proficiency_medium_armour"
              type="checkbox"
              label="Medium Armour"
              value={character.proficiencies.medium_armour}
            />

            <Input
              name="proficiency_heavy_armour"
              type="checkbox"
              label="Heavy Armour"
              value={character.proficiencies.heavy_armour}
            />

            <Input
              name="proficiency_simple_weapons"
              type="checkbox"
              label="Simple Weapons"
              value={character.proficiencies.simple_weapons}
            />

            <Input
              name="proficiency_martial_weapons"
              type="checkbox"
              label="Martial Weapons"
              value={character.proficiencies.martial_weapons}
            />

            <Input
              name="proficiency_shields"
              type="checkbox"
              label="Shields"
              value={character.proficiencies.shields}
            />
          </fieldset>
        </div>
      </div>

      <div>
        <fieldset id="ability_scores">
          <legend>Ability Scores</legend>

          {ability_scores.map((ability_score) => (
            <fieldset key={ability_score.name} className="ability_score">
              <legend>{ability_score.label}</legend>

              <Input
                name={`${ability_score.name}_score`}
                type="number"
                label="Score"
                value={character.ability_scores[ability_score.name]?.score}
              />

              <Input
                name={`${ability_score.name}_saving_throws`}
                type="checkbox"
                label="Saving Throws"
                value={
                  character.ability_scores[ability_score.name]?.saving_throws
                }
              />

              {character.ability_scores[
                ability_score.name
              ]?.skill_proficiencies?.map((skill_proficiency) => (
                <div
                  key={skill_proficiency.name}
                  className="ability_score_proficiency"
                >
                  <p>{skill_proficiency.label}</p>

                  <Input
                    name={`${ability_score.name}_${skill_proficiency.name}_proficient`}
                    type="checkbox"
                    label="Proficient"
                    value={skill_proficiency.proficient}
                  />

                  <Input
                    name={`${ability_score.name}_${skill_proficiency.name}_expertise`}
                    type="checkbox"
                    label="Expertise"
                    value={skill_proficiency.expertise}
                  />
                </div>
              ))}
            </fieldset>
          ))}
        </fieldset>
      </div>
    </div>
  );
}

function ViewWrapper() {
  const character = useLoaderData();

  return <View character={character} />;
}

export default ViewWrapper;
